import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
public hylle: any;
public rad: any;
  constructor(public storage: Storage, public http: HttpClient) {
    // console.log('Hello DataServiceProvider Provider');
    
  }

  getBooks(){
    return this.http.get('assets/data/books.json')
      .map((response:Response)=>response.json());
  }


  // Or to get a key/value pair
  getHylle() {
    let val = '';
    this.storage.get('hylle').then((value) => {
      val = value;
      console.log('hylle',val);
      this.hylle = val;
    });
    return this.hylle;
  }
  setRad(rad) {
     this.storage.set('rad', rad);
  }
  setHylle(hylle) {
     this.storage.set('hylle', hylle);
  }
  getRad() {
    let val = '';
    this.storage.get('rad').then((value) => {
      val = value;
      console.log('rad',val);
      this.rad = val;
    });
    return this.rad;
  }
}
