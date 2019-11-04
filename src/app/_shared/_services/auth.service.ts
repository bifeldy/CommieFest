import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
  ) {
    if (localStorage.getItem('currentUser') == null || localStorage.getItem('currentUser') === '') {
      localStorage.removeItem('currentUser');
    }
    try {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(window.atob(localStorage.getItem('currentUser'))));
    } catch (e) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(userName: string, password: string, rememberMe: boolean) {
    return this.http.post<any>(environment.server.apiUrl + environment.server.authUrl, {
      userName, password
    }).pipe(map(user => {
      if (rememberMe) {
          localStorage.setItem('currentUser', window.btoa(JSON.stringify(user)));
        }
      this.currentUserSubject.next(user);
      return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
