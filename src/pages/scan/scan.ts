import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { HttpClient } from '@angular/common/http';
import { TextToSpeech } from '@ionic-native/text-to-speech';

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  public scannedText: string;
  public buttonText: string;
  public errorTxt: string;
  public loading: boolean;
  public lestittel: boolean;
  public bd: any;

  resultat: any;
  // private eventId: number;
  public eventTitle: string;
  products: any;
  selectedProduct: any;
  productFound:boolean = false;
  constructor(private tts: TextToSpeech, private toast: Toast, public http: HttpClient,
    public dataService: DataServiceProvider, public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {

      this.dataService.getBooks()
      .subscribe((response)=> {
          this.products = response
          console.log(this.products);
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });    
  }
  public clear() {
    this.bd = "";
    this.resultat = '';
    this.errorTxt = "";
  }
  public scanQR() {
    this.bd = "";
    this.buttonText = "Loading..";
    this.loading = true;
    this.errorTxt = "";
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("User cancelled the action!");
        this.buttonText = "Scan";
        this.loading = false;
        return false;
      }
      console.log("Scanned successfully!");
      console.log(barcodeData);
      this.selectedProduct = barcodeData.text;
      this.goToResult(barcodeData.text);
    }, (err) => {
      console.log(err);
    });
  }
   goToResultTest() {
    this.goToResult('9788248921233');
    // this.goToResult('97882482921233');
  }
   goToResult(barcodeData) {
    this.bd = barcodeData;
    // let apiUrl = 'http://sru.bibsys.no/search/biblio?version=1.2&operation=searchRetrieve&startRecord=1&maximumRecords=10&query='+barcodeData+'&recordSchema=marcxchange';
    let apiUrl = 'http://www.vosskulturkalender.no/get/bokId/'+barcodeData;

    this.http.get(apiUrl).subscribe(data => {
      this.resultat = data;
      console.log(data);
      if (this.resultat.google || this.resultat.bibsys) {

      if (this.resultat.google && this.lestittel) {
        this.tts.speak(
          {
            text: this.resultat.google.bookname,
            locale: "nb-NO" // Pass any locale you want here.
          }
          )
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
      }
      if (this.resultat.bibsys && this.lestittel) {
        this.tts.speak(          {
          text: this.resultat.bibsys.bookname,
          locale: "nb-NO" // Pass any locale you want here.
        })
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
      }      
      console.log('got data:',data);
      // console.log('google:', data.google);

    } else {
      console.log(barcodeData);
      if (data.error==='nobook') {
      this.errorTxt = 'Ingen bokdetaljer funnet på '+barcodeData+'.';
      // this.errorTxt = barcodeData+': '+data.error;
      }
    }



    }, err => {
      console.log(err);
    });
      // this.navCtrl.push(ScanResultPage, {
    //   scannedText: barcodeData.text
    // });
  }


  scan() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
      } else {
        this.productFound = false;
        this.toast.show(`Product not found`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }
}

