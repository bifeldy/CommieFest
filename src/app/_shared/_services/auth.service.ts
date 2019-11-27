import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { auth } from 'firebase/app';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData: any;

  constructor(
    private router: Router,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
  ) {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.userData = JSON.parse(localStorage.getItem('user'));
    }
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
      JSON.parse(localStorage.getItem('user'));
    });
  }

  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then((result) => {
      this.SetUserData(result.user);
    });
  }

  SetUserData(user, manualRegistName = null, manualRegistPhoto = null) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    };
    if (manualRegistName) {
      userData.displayName = manualRegistName;
    } else if (userData.displayName) {
      userData.displayName = user.displayName;
    }
    if (manualRegistPhoto) {
      userData.photoURL = manualRegistPhoto;
    } else if (userData.photoURL) {
      userData.photoURL = user.photoURL;
    }
    return userRef.set(userData, { merge: true });
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    });
  }

}
