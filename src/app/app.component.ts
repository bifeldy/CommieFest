import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './_shared/_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Beranda Saya',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Cari Event',
      url: '/search',
      icon: 'search'
    },
    {
      title: 'Event Saya',
      url: '/events',
      icon: 'list'
    },
    {
      title: 'Pemberitahuan',
      url: '/notifications',
      icon: 'notifications'
    },
    {
      title: 'Pengaturan',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'exit'
    }
  ];

  userCoverImgStyle = {};
  user = {};

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService
  ) {
    this.initializeApp();

    this.user = this.userService.getUser();
    this.userCoverImgStyle = {
      background: 'url("/assets/shapes.svg"), linear-gradient(to bottom, #0066cc 0%, #4c8dff 100%)',
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-size': 'cover'
    };
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      const toggle = document.querySelector('#themeToggle');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

      toggle.addEventListener('ionChange', (ev) => {
        document.body.classList.toggle('dark', (ev as any).detail.checked);
      });

      // tslint:disable-next-line: deprecation
      prefersDark.addListener((e) => {
        (toggle as any).checked = e.matches;
      });

    });
  }
}
