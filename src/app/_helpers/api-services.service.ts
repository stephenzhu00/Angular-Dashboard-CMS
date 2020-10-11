import { Injectable } from '@angular/core';
import { EventItems } from '../EventItems';
import { RequestBand } from '../RequestBand';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  events_list;
  requests_list;
  constructor() { 
    this.events_list = EventItems;
    this.requests_list = RequestBand;
  }

  getEvents(){
    return this.events_list;
  }
  getEventById(eventId){
    return this.events_list.find(x => x.id == eventId);
  }
  getRequests(){
    return this.requests_list;
  }
}
