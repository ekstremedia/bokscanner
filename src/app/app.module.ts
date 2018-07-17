import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { ScanPage } from './../pages/scan/scan';
import { OmbruktnPage } from './../pages/ombruktn/ombruktn';
import { BrowserModule } from '@angular/platform-browser';
import {IonicStorageModule} from '@ionic/storage';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    OmbruktnPage,
    ScanPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
   HttpClientModule,
    HttpModule,
     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    OmbruktnPage,
    ScanPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IonicStorageModule,
    BarcodeScanner,
    TextToSpeech,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataServiceProvider
  ]
})
export class AppModule {}
