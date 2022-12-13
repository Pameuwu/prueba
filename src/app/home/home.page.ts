import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ToastController, LoadingController, Platform, IonList } from '@ionic/angular';
import jsQR from 'jsqr';
import { isNull } from 'util';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('video', { static: false }) "video": ElementRef;
  @ViewChild('canvas', { static: false }) "canvas": ElementRef;
  @ViewChild('fileinput', { static: false }) "fileinput": ElementRef;
  scanActive = true;
  scanResult = null;
  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  loading!: HTMLIonLoadingElement;

  constructor( private toastCtrl: ToastController, private loadingCtrl: LoadingController,
    private plt: Platform) {
      
        const isInStandaloneMode = () =>
          'standalone' in window.navigator && window.navigator;
        if (this.plt.is('ios') && isInStandaloneMode()) {
          console.log('I am a an iOS PWA!');
          // E.g. hide the scan functionality!
        }
      
    
  }
  
  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
  }

  ngOnInit() {
  }
  reset() {
    this.scanResult = null;
  }

  stopScan() {
    this.scanActive = false;
  }

  async startScan() {
    // Not working on iOS standalone mode!
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
  
    this.videoElement.srcObject = stream;
    // Required for Safari
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
    
  }
  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading;
        this.scanActive = true;
      }
  
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;
  
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
  
      if (code) {
        this.scanActive = false;
        this.scanResult;
        this.showQrToast();
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }
  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            window.open('this.scanResult', '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
  }
  captureImage() {
    this.fileinput.nativeElement.click();
  }
  
  handleFile(files: FileList) {
    const file = files.item(0);
  
    var img = new Image();
    img.onload = () => {
      this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
  
      if (code) {
        this.scanResult;
        this.showQrToast();
      }
    };
   
    
  }

}

  

