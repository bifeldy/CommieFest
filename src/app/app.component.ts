import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
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
