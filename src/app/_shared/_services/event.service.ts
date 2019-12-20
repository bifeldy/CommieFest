import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

import { Event } from '../_models/event';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private eventsCollection: AngularFirestoreCollection<Event>;
  private usersCollection: AngularFirestoreCollection<User>;
  currAddress = new BehaviorSubject<string>('');

  constructor(
    private db: AngularFirestore,
    private auth: AuthService
  ) {
    this.eventsCollection = db.collection<Event>('events');
    this.usersCollection = db.collection<User>('users');
  }

  getEvents(): Observable<Event[]> {
    return this.eventsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getEventById(id) {
    return this.eventsCollection.doc<Event>(id).valueChanges();
  }

  updateEvent(event: Event, id: string) {
    return this.eventsCollection.doc(id).update(event);
  }

  addEvent(event: Event) {
    return this.eventsCollection.add(event);
  }

  removeEvent(id) {
    return this.eventsCollection.doc(id).delete();
  }

  getEventsWithQuery(where1 = '', where2 = '') {
    return this.db.collection<Event>('events',
      ref => ref.where(where1, '==', where2)
    ).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getEventsWithQuery2(where1 = '', where2 = '', where3 = '', where4 = '', orderBy = '') {
    return this.db.collection<Event>('events',
      ref => ref.where(where1, '==', where2).where(where3, '==', where4).orderBy(orderBy)
    ).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getAddress() {
    return this.currAddress.asObservable();
  }

  setAddress(address: string) {
    this.currAddress.next(address);
  }

  addFollowEvent(event: Event) {
    return this.usersCollection.doc<any>(this.auth.userData.uid).collection<Event>('followEvent').doc(event.id).set({event});
  }

  getFollowEventById(id) {
    return this.usersCollection.doc<any>(this.auth.userData.uid).collection<Event>('followEvent').doc(id).valueChanges();
  }

  removeFollowEvent(id) {
    return this.usersCollection.doc<any>(this.auth.userData.uid).collection<Event>('followEvent').doc(id).delete();
  }

  getFollowEvent(): Observable<Event[]> {
    return this.usersCollection.doc<any>(this.auth.userData.uid).collection<Event>('followEvent').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
