import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Event } from '../_models/event';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private eventsCollection: AngularFirestoreCollection<Event>;

  constructor(
    private db: AngularFirestore
  ) {
    this.eventsCollection = db.collection<Event>('events');
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
}
