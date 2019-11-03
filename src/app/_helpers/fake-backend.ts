import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../_shared/_models/user';
import {environment} from '../../environments/environment';

// TODO: Remove fake users account below
const users: User[] = [
  {
    id: 1,
    userName: 'Bifeldy',
    password: '1234567890',
    firstName: 'Basilius Bias Astho',
    lastName: 'Christyono',
    profileImg: 'http://placehold.it/64x64',
    coverImg: '/assets/shapes.svg',
    email: 'bifeldy@gmail.com'
  }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      // TODO: Remove this cases for passing data to real server
      switch (true) {
        case url.endsWith(environment.server.authUrl) && method === 'POST':
          return authenticate();
        case url.endsWith(environment.server.userUrl) && method === 'GET':
          return getUsers();
        default:
          return next.handle(request);
      }
    }

    // TODO: Remove fake server function below

    function authenticate() {
      const { userName, password } = body;
      const user = users.find(x => x.userName === userName && x.password === password);
      if (!user) { return error('Nama pengguna atau kata sandi salah!'); }
      return ok({
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImg: user.profileImg,
        coverImg: user.coverImg,
        email: user.email,
        token: 'fake-jwt-token'
      });
    }

    function getUsers() {
      if (!isLoggedIn()) { return unauthorized(); }
      return ok(users);
    }

    // tslint:disable-next-line:no-shadowed-variable
    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    // TODO: Remove fake server function above
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
