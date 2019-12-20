import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm, FormGroup } from '@angular/forms';

import { AuthService } from '../_shared/_services/auth.service';
import { UserService } from '../_shared/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  loading = false;
  rememberMe = false;
  returnUrl = '';
  errorInfo = '';

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() { }

  onLogin(f: NgForm) {
  this.loading = true;
  this.loadingCtrl.create({ keyboardClose: true, message: 'Harap menunggu sebentar ...' })
    .then(loadingEl => {
      loadingEl.present();
      this.authService.SignIn(f.value.email, f.value.password).then(resp => {
        this.userService.getUser(resp.user.uid).subscribe(res => {
          this.authService.SetUserData(resp.user, res.displayName, res.photoURL).then(result => {
            if(resp.user.emailVerified == false){
              this.errorInfo = ("Email Not Verified");
              this.loading = false;
              loadingEl.dismiss();
            }
            else if(resp.user.emailVerified == true){
              this.loading = false;
              loadingEl.dismiss();
              this.reDirectSuccessLogin();
            }
            // this.loading = false;
            // loadingEl.dismiss();
            // this.reDirectSuccessLogin();
          });
        });
      }).catch(err => {
        this.errorInfo = err.message;
        this.loading = false;
        loadingEl.dismiss();
      });
    });
  }

  googleLogin() {
    this.authService.GoogleAuth().then(res => {
      this.reDirectSuccessLogin();
    });
  }

  reDirectSuccessLogin() {
    if (this.returnUrl === '') {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigate([this.returnUrl]);
    }
  }
}
