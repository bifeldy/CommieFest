import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = {};

  constructor() {

    // Dummy Data
    this.user = {
      id : 'Bifeldy',
      name: 'B. Bias A. Ch.',
      profile: 'http://placehold.it/64x64',
      cover: '/assets/shapes.svg',
      email: 'bifeldy@gmail.com'
    };

  }

  getUser() {
    if (Object.entries(this.user).length === 0 && this.user.constructor === Object) {
      this.user = {
        id : '',
        name: 'Tamu',
        profile: 'http://placehold.it/64x64',
        cover: '/assets/shapes.svg',
        email: ''
      };
    }
    return this.user;
  }
}
