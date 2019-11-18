import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User } from '../_models/user';
import { environment } from '../../../environments/environment';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = new BehaviorSubject<User>(null);

  _isAuthenticated = false;
  userId = null;

  constructor(
    private http: HttpClient,
  ) { }

  get isAuthenticated() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return !!user.token;
      } else {
        return null;
      }
    }));
  }

  signup(email: string, password: string) {
    //firebase singup API here
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      tap(userData => {
        const expTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
        this._user.next(new User(userData.localId, userData.email, userData.idToken, expTime));
      })
    );
  }

  setUser(userId: string) {
    this.userId = userId;
    this._isAuthenticated = true;
  }

  login(email: string, password: string) {
    //firebase login API here
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }

  logout() {
    this._user.next(null);
  }

}
