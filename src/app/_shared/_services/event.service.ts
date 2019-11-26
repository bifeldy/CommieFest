import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Event {
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  category: string;
  ticketPrice: number;
  pricePool: number;
  dateStart: string;
  dateEnd: string;
}

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private eventsCollection: AngularFirestoreCollection<Event>;

  constructor(db: AngularFirestore) {
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

  getEvent(id) {
    return this.eventsCollection.doc<Event>(id).valueChanges();
  }

  updateEvent(event: Event, id: string) {
    return this.eventsCollection.doc(id).update(event);
  }

  addEvent(event: Event) {
    return this.eventsCollection.add(event);
  }
}
