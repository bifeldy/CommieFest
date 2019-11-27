import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm, FormGroup } from '@angular/forms';

import { AuthService } from '../_shared/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;
  loading = false;
  errorInfo = '';

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService
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
            this.authService.SetUserData(res.user);
          });
        }).catch(err => {
          this.errorInfo = err.message;
          this.loading = false;
          loadingEl.dismiss();
        });
      });
    }
}
