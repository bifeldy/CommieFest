import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './_shared/_services/auth.service';
import { User } from './_shared/_models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Beranda',
      url: '/home',
      icon: 'home',
      shouldLogin: false
    },
    {
      title: 'Cari Event',
      url: '/search',
      icon: 'search',
      shouldLogin: false
    },
    {
      title: 'Event Saya',
      url: '/list',
      icon: 'list',
      shouldLogin: true
    },
    {
      title: 'Pemberitahuan',
      url: '/notifications',
      icon: 'notifications',
      shouldLogin: true
    }
  ];

  public darkMode;

  public miscPages = [];

  userCoverImgStyle = {};
  currentUser: User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      const toggle = document.querySelector('#themeToggle');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.darkMode = JSON.parse(localStorage.getItem('darkMode'));
      if (this.darkMode) {
        document.body.classList.toggle('dark', this.darkMode as boolean);
      }
      toggle.addEventListener('ionChange', (ev) => {
        document.body.classList.toggle('dark', (ev as any).detail.checked);
        localStorage.setItem('darkMode', (ev as any).detail.checked);
      });
      // tslint:disable-next-line: deprecation
      prefersDark.addListener((e) => {
        (toggle as any).checked = e.matches;
      });
      this.userCoverImgStyle = {
        // tslint:disable-next-line:max-line-length
        background: `url('/assets/shapes.svg'), linear-gradient(to bottom, #0066cc 0%, #4c8dff 100%)`,
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
      };
    });
  }

  logout() {
    this.authService.SignOut();
  }
}
