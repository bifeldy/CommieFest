import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm, FormGroup } from '@angular/forms';

import { AuthService } from '../_shared/_services/auth.service';
import { CameraService } from '../_shared/_services/camera.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  loading = false;
  errorInfo = '';

  photoUrl = 'https://www.simplicitysofas.com/img/placeholder.png';

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private cameraService: CameraService
  ) { }

  ngOnInit() { }

  onRegister(f: NgForm) {
    this.loading = true;
    this.loadingCtrl.create({ keyboardClose: true, message: 'Harap menunggu sebentar ...' })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.SignUp(f.value.email, f.value.password).then(res => {
          this.authService.SendVerificationMail().then(result => {
            this.loading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/verify');
            this.authService.SetUserData(res.user, f.value.name, this.photoUrl);
          });
        }).catch(err => {
          this.errorInfo = err.message;
          this.loading = false;
          loadingEl.dismiss();
        });
      }
    );
  }

  openCamera() {
    this.cameraService.openCamera().then((imageData) => {
      this.photoUrl = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(err);
    });
  }

  openGallery() {
    this.cameraService.openGallery().then((imageData) => {
      this.photoUrl = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(err);
    });
  }
}
