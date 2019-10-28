import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { LogibService } from './logib.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: LogibService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    // this.authService.login();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    console.log(email, password);

    if (this.isLogin) {

    } else {

    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onLogin() {
    this.isLoading = true;
    this.loadingCtrl.create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/home');
        }, 1500);
      });
    this.authService.login();
  }
}
