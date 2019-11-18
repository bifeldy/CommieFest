import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { AuthService } from '../_shared/_services/auth.service';
import { SignupComponent } from '../_shared/_components/signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  loading = false;
  returnUrl: string;
  rememberMe = false;
  error = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(resp => {
      if (resp) {
        console.log('User is authenticated');
        this.router.navigateByUrl('/home');
      } else {
        console.log('No user');
      }
    });
  }

  onSignUp(f: NgForm) {
    this.authService.signup(f.value.email, f.value.pwd).subscribe(resp => {
      console.log(resp);
    })
  }

  onLogin(f: NgForm) {
    this.authService.login(f.value.email, f.value.pwd).subscribe(
      resp => {
        if (resp.idToken) {
          console.log(resp);
          this.router.navigateByUrl('/home');
        } else {
          console.log('login failed');
        }
      },
      errorResp => {
        console.log(errorResp);
      }
    );

  }

  async presentSignUpModal() {
    const modal = await this.modalCtrl.create({
      component: SignupComponent
    });
    return await modal.present();
  }
  // onSubmit(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   this.loading = true;
  //   this.loadingCtrl.create({ keyboardClose: true, message: 'Logging in...' })
  //     .then(loadingEl => {
  //       loadingEl.present();
  //       this.authService.login(form.value.userName, form.value.password, form.value.rememberMe)
  //         .pipe(first())
  //         .subscribe(
  //           data => {
  //             this.loading = false;
  //             loadingEl.dismiss();
  //             this.router.navigate([this.returnUrl]);
  //           },
  //           error => {
  //             this.error = error;
  //             this.loading = false;
  //             loadingEl.dismiss();
  //           }
  //         );
  //     });
  // }
}
