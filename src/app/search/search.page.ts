import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../_shared/_services/event.service';
import { AuthService } from '../_shared/_services/auth.service';
import { Event } from '../_shared/_models/event';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchQuery = '';
  searchResult = [];

  // public loadedEvent: any[];

  // filterData = [];
  // searchTerm: string = "";

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public authService: AuthService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    // Get Data From URL
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params.q;
      this.search();
    });
  }

  search() {
    this.eventService.getEventsWithQuery('name', this.searchQuery).subscribe(
      res => {
        console.log(res);
        this.searchResult = res;
      },
      err => {
        console.log(err);
      }
    );
  }



    // this.eventService.getEvents().subscribe(res => {
    //   this.events = res;
    //   // this.loadedEvent = res;
    //   this.filterData = this.events;
    //   this.setFilter();
    // });
  // }
  // initItem(): void{
  //   this.events = this.loadedEvent;
  // }
  //   filterList(){
  //     this.initItem();
  //     if(!this.searchQuery){
  //       return;
  //     }
  //     this.events = this.events.filter(currentName=>{
  //     //   if(currentName.name && this.searchQuery){
  //     //     if(currentName.name.toLowerCase().indexOf(this.searchQuery.toLowerCase())>-1){
  //     //       return true;
  //     //     }
  //     //     return false;
  //     //   }
  //     // })
  //     this.filterData = this.events.filter((Event)=>{
  //       return Event.name.toLowerCase().indexOf(this.searchQuery.toLowerCase())>-1;
  //     });
  //   }

  // }

  // search($event) {
  //   this.router.navigateByUrl('/search?q=' + $event.target.value);
  //   this.eventService.getEvents().subscribe(res => {
  //     this.events = res;
  //     // this.loadedEvent = res;
  //     this.filterData = this.events;
  //     this.setFilter();
  //   });
  // }
  // setFilter() {
  //   this.filterData = this.events.filter((event) => {
  //     return event.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
  //   });
  // }
  // setFilteredEvents() {
  //   this.router.navigateByUrl('/search');
  //   this.filterData = this.events.filter((event) => {
  //     return event.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
  //   });
  // }
}
