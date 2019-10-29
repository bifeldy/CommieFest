import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string, location: string, hadiah: string }> = [];

  constructor() {
    for (let i = 1; i < 10; i++) {
      this.items.push({
        title: 'Event ' + i,
        note: 'This is item #' + i,
        location: 'Loc ' + i,
        hadiah: i + "00.000",
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }


  }

  getDummyDate() {
    return new Date();
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
