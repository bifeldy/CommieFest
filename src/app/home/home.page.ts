import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { UserService } from '../_shared/_services/user.service';
import { EventService } from '../_shared/_services/event.service';
import { Event } from '../_shared/_models/event';
import { NavController } from '@ionic/angular';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loadedEvents: Event[];
  filterLoadedEvents = [];
  user = {};
  showToolbar = false;
  searchTerm: string = "";
  bannerImgStyle = {
    height: '45%',
    background: 'url("/assets/season/fall.svg"), linear-gradient(to bottom, #0066cc 0%, #4c8dff 100%)',
    'background-position': 'center',
    'background-repeat': 'no-repeat',
    'background-size': 'cover'
  };

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {
    this.loadedEvents = this.eventService.getAllEvents();
    this.filterLoadedEvents = this.loadedEvents;
  }

  getDummyDate() {
    return new Date();
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
    
  }

  // getTitle(ev) {
  //   var ev = 
  //   // Reset items back to all of the items
  //   this.ngOnInit();
  //   this.loadedEvents
  //   // set val to the value of the ev target
  //   var val = ev.target.value;

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.eventService. = this.loadedEvents.filter((e) => {
  //       return (e.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
  // }
  getTitle(event){
    this.eventService.getAllEvents();
    // this.loadedEvents;
    // var valuee = event.prize
    var valuee = event.name.value;
    if(valuee && valuee.trim() != ''){
      this.loadedEvents = this.loadedEvents.filter((event)=>{
        return (event.toLowerCase().indexOf(valuee.toLowerCase())>-1);
      })
    }
  }
  // filterData(){
  //   this.loadedEvents = this.loadedEvents.filter((e) =>{
  //     // return e.name = "Touring Balap";
  //     return false;
  //   });
  // }
  setFilteredEvents(){
    
    this.filterLoadedEvents = this.loadedEvents.filter((e) =>{
      return e.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

}
