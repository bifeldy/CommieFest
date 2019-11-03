import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
    // Dummy Data
    // this.user = {
    //   id : 'Bifeldy',
    //   name: 'B. Bias A. Ch.',
    //   profile: 'http://placehold.it/64x64',
    //   cover: '/assets/shapes.svg',
    //   email: 'bifeldy@gmail.com'
    // };
  }

  getUser(userName: string) {
    // if (Object.entries(this.user).length === 0 && this.user.constructor === Object) {
    //   this.user = {
    //     id : '',
    //     name: 'Tamu',
    //     profile: 'http://placehold.it/64x64',
    //     cover: '/assets/shapes.svg',
    //     email: ''
    //   };
    // }
    // return this.user;
    return this.http.get<User>(`${environment.server.apiUrl + environment.server.userUrl}/${userName}`);
  }
}
