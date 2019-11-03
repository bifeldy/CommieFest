import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {FormGroup, NgForm} from '@angular/forms';
import { LogibService } from './logib.service';
import {first} from 'rxjs/operators';
import {AuthService} from '../_shared/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading = false;
  returnUrl: string;
  error = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    console.log(form.value.userName, form.value.password);
    this.loading = true;
    this.loadingCtrl.create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.login(form.value.userName, form.value.password)
          .pipe(first())
          .subscribe(
            data => {
              this.loading = false;
              loadingEl.dismiss();
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.error = error;
              this.loading = false;
              loadingEl.dismiss();
            }
          );
      });
  }
}
