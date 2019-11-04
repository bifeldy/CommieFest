import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUserByUserName(userName: string) {
    return this.http.get<User>(`${environment.server.apiUrl + environment.server.userUrl}/${userName}`);
  }
}
