import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  onSignUp(f: NgForm) {
    console.log(f.value);
    this.authService.signup(f.value.email, f.value.pwd).subscribe(resp => {
      console.log(resp);
      this.modalCtrl.dismiss();
    });
  }


  onCancel() {
    this.modalCtrl.dismiss();
  }

}
