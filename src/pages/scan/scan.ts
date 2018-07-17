import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { HttpClient } from '@angular/common/http';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';

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
  public hylle: string;
  public rad: string;
  public bookname: string;
  public slett: any;
  public errorTxt: string;
  public solgt: any;
  public loading: boolean;
  public lestittel: boolean;
  public apiUrl: any;
  public bd: any;
  public resultat: any;
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
    this.bookname = "";
    this.slett = "";
    this.errorTxt = "";
    this.solgt = "";
    this.apiUrl = "";
  }


  public scanQR() {
    this.clear();

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

  public slettQR() {
    this.clear();

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
      this.slettBok(barcodeData.text);
    }, (err) => {
      console.log(err);
    });
  }
  public selgQR() {
    this.clear();

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
      this.selgBok(barcodeData.text);
    }, (err) => {
      console.log(err);
    });
  }



   goToResultTest() {
    this.goToResult('9781416562023');
    // this.goToResult('8252161618');
    // this.goToResult('97882482921233');
  }
   testSelg(bokid) {
    this.selgBok('9781416562023');
    // this.goToResult('8252161618');
    // this.goToResult('97882482921233');
  }
   testSlett(bokid) {
    this.slettBok('9781416562023');
    // this.goToResult('8252161618');
    // this.goToResult('97882482921233');
  }
   goToResult(barcodeData) {
    this.clear();
    console.log(barcodeData);
    this.bd = barcodeData;
    console.log(this.bd);
    // let apiUrl = 'http://sru.bibsys.no/search/biblio?version=1.2&operation=searchRetrieve&startRecord=1&maximumRecords=10&query='+barcodeData+'&recordSchema=marcxchange';
    let apiUrl = 'http://www.bruktn.no/get/bokId/'+barcodeData+'/'+this.hylle+'/'+this.rad;
    this.apiUrl = apiUrl;
    this.http.get(apiUrl).subscribe(data => {
      this.resultat = data;
      if (this.resultat && this.resultat.bookname) {

        if (this.lestittel) {
          this.tts.speak(
            {
              text: this.resultat.bookname,
              locale: "nb-NO" // Pass any locale you want here.
            }
            )
          .then(() => console.log('Success'))
          .catch((reason: any) => console.log(reason));
        }
 
      console.log('got data:',data);
      // console.log('google:', data.google);

    } else {
      this.errorTxt = 'Ingen bokdetaljer funnet på '+barcodeData+'.';
      // this.errorTxt = barcodeData+': '+data.error;
    }



    }, err => {
      console.log(err);
      this.errorTxt = JSON.stringify(err);
    });
      // this.navCtrl.push(ScanResultPage, {
    //   scannedText: barcodeData.text
    // });
  }


  slettBok(barcodeData) {
    this.clear();
    console.log(barcodeData);
    this.bd = barcodeData;
    // let apiUrl = 'http://sru.bibsys.no/search/biblio?version=1.2&operation=searchRetrieve&startRecord=1&maximumRecords=10&query='+barcodeData+'&recordSchema=marcxchange';
    let apiUrl = 'http://www.bruktn.no/get/slettBok/'+barcodeData;
    this.apiUrl = apiUrl;
    this.http.get(apiUrl).subscribe(data => {
      let res = data;
      if (res) {
        this.slett = 1;
        if (this.lestittel) {
          this.tts.speak(
            {
              text: 'Slettet bok! ',
              locale: "nb-NO" // Pass any locale you want here.
            }
            )
          .then(() => console.log('Success'))
          .catch((reason: any) => console.log(reason));
        }
 
      console.log('got data:',data);
      // console.log('google:', data.google);

    } else {
      this.errorTxt = 'Ingen bokdetaljer funnet på '+barcodeData+'.';
      // this.errorTxt = barcodeData+': '+data.error;
      if (this.lestittel) {
        this.tts.speak(
          {
            text: this.errorTxt,
            locale: "nb-NO" // Pass any locale you want here.
          }
          )
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
      }      
    }



    }, err => {
      console.log(err);
      this.errorTxt = JSON.stringify(err);
    });
      // this.navCtrl.push(ScanResultPage, {
    //   scannedText: barcodeData.text
    // });
  }
  selgBok(barcodeData) {
    this.clear();
    console.log(barcodeData);
    this.bd = barcodeData;
    // let apiUrl = 'http://sru.bibsys.no/search/biblio?version=1.2&operation=searchRetrieve&startRecord=1&maximumRecords=10&query='+barcodeData+'&recordSchema=marcxchange';
    let apiUrl = 'http://www.bruktn.no/get/selgBok/'+barcodeData;
    this.apiUrl = apiUrl;
    this.http.get(apiUrl).subscribe(data => {
      let res = data;
      if (res) {
        this.solgt = 1;
        if (this.lestittel) {
          this.tts.speak(
            {
              text: 'Solgt ',
              locale: "nb-NO" // Pass any locale you want here.
            }
            )
          .then(() => console.log('Success'))
          .catch((reason: any) => console.log(reason));
        }
 
      console.log('got data:',data);
      // console.log('google:', data.google);

    } else {
      this.errorTxt = 'Ingen bokdetaljer funnet på '+barcodeData+'.';
      // this.errorTxt = barcodeData+': '+data.error;
      if (this.lestittel) {
        this.tts.speak(
          {
            text: this.errorTxt,
            locale: "nb-NO" // Pass any locale you want here.
          }
          )
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
      }      
    }



    }, err => {
      console.log(err);
      this.errorTxt = JSON.stringify(err);
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

