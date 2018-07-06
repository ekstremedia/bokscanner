import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private toast: Toast, public navCtrl: NavController) {

  }
  test() {
    this.toast.show(`Product not found`, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}
