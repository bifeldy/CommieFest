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
    ),
    new Event(
      3,
      'Panjat Gunung',
      'Panjat gunung adalah olahraga, hobi, ataupun profesi berjalan dan mendaki pegunungan. Bermula sebagai usaha total seluruh kemampuan hidup untuk mencapai titik tertinggi pegunungan tak terdaki',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9t891bAiPoalt7fksSRQHkLF8k46Va4bDffWhzZfBf21pzwBH',
      'Gunung Dieng',
      'Olahraga',
      300000,
      6000000,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Event(
      4,
      'Basket Team',
      'Bola basket (bahasa Inggris: basketball) adalah olahraga bola berkelompok yang terdiri atas dua tim beranggotakan masing-masing lima orang yang saling bertanding mencetak poin dengan memasukkan bola ke dalam keranjang lawan. Bola basket sangat cocok untuk ditonton karena biasa dimainkan di ruang olahraga tertutup dan hanya memerlukan lapangan yang relatif kecil.',
      'https://www.campbellrivermirror.com/wp-content/uploads/2019/05/17072610_web1_raptors-pacers.jpg',
      'Gedung Olahraga',
      'Olahraga',
      400000,
      6000000,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Event(
      5,
      'Tekken 7',
      'Tekken 7 berfokus pada pertempuran 1v1 . [3] Dua mekanisme diperkenalkan dalam game. Yang pertama, Seni Rage, memungkinkan pemain untuk melakukan serangan kritis yang menangani sekitar 30% kerusakan tergantung pada karakter setelah bar kesehatan mereka sangat rendah. Yang kedua, Power Crush, memungkinkan pemain melanjutkan serangan mereka bahkan ketika sedang dihantam oleh musuh, meskipun mereka masih akan menerima kerusakan yang ditangani oleh serangan musuh.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRtxxoJGeeCMpEYPYk6dEjYhvFXoJnz7PxRsv1pkG5C-uU4HGpR',
      'Lobby B',
      'Tournament',
      30000,
      4000000,
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
