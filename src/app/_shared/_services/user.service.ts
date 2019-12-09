import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import { User } from '../_models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore
  ) {
    this.usersCollection = this.afs.collection<User>('users');
  }

  getUser(id) {
    return this.usersCollection.doc<User>(id).valueChanges();
  }
}
