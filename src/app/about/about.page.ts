import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-about',
	templateUrl: './about.page.html',
	styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnInit {
	// @ViewChild(Slides) slides: Slides;
	ImageArray: any = [];

	constructor(public navCtrl: NavController) {
		this.ImageArray = [
			{
				image: 'assets/member/tepen.jpg',
				nama: 'Steve',
				nim: '13433',
				role: 'leader'
			},
			{
				image: 'assets/member/bias.jpg',
				nama: 'Basillius B.A',
				nim: '13536',
				role: 'member'
			},
			{
				image: 'assets/member/rangga.jpg',
				nama: 'Rangga D. K.',
				nim: '13662',
				role: 'member'
			},
			{
				image: 'assets/member/hans.jpg',
				nama: 'Hans A. L.',
				nim: '14142',
				role: 'member'
			},
			{
				image: 'assets/member/fatan.jpg',
				nama: 'Fathan F.',
				nim: '13938',
				role: 'member'
			}
		];
	}

	// slideChange() {
	// 	let index = this.slides.getActiveIndex();
	// 	console.log('current index is', index);
	// }

	ngOnInit() {}
}
