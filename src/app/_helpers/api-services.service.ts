import { Injectable } from '@angular/core';
import { EventItems } from '../EventItems';
import { RequestBand } from '../RequestBand';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  events_list;
  requests_list;
  constructor(private httpClient:HttpClient) { 
    this.events_list = EventItems;
    this.requests_list = RequestBand;
  }

  getEvents(){
    return this.httpClient.get('http://localhost:8085/hack');
  }
  getEventById(eventId){
    return this.httpClient.get('http://localhost:8085/hack/' +(eventId -1));
  }
  getRequests(){
    return this.httpClient.get('http://localhost:8085/request');
  }
}
