import { Injectable } from '@angular/core';
import { Event } from '../_models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _events: Event[] = [
    new Event(
      1,
      'Touring Balap',
      'Kegiatan touring bagi sebagian pecinta motor adalah aktivitas yang sangat menarik. Selain memacu adrenalin dengan medan yang tak selamanya mulus, pemandangan baru yang memanjakan mata juga seringkali ditemui selama perjalanan.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuf3n9-K8OsVzuUzAxkbd7Mqsz7Gwdr6e3SbXzyDvwNy3zrdDC',
      'Puncak Bogor',
      'Hiburan',
      200000,
      5000000,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Event(
      2,
      'Jogging Pagi',
      'Jogging atau lari santai adalah salah satu aktivitas fisik yang mudah dan murah. Tak perlu modal banyak, cukup dengan sepatu, Anda sudah bisa jogging di sekitar komplek rumah. Bukan hanya praktis, jogging pun efektif bisa bakar lemak, lho!',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTn9ZidaOuPI3oXn8RFTnvWHQ4dj5xW--4UADMk9hBFTflUNDEQ',
      'Lapangan',
      'Olahraga',
      300000,
      6000000,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    )
  ]
  constructor() { }

  getAllEvents() {
    return [...this._events];
  }

  deleteMyEvent(eventId: number) {
    this._events = this._events.filter(ivent => {
      return ivent.id !== eventId;
    });
  }
}
