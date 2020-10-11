import { Injectable } from '@angular/core';
import { EventItems } from '../EventItems';
import { RequestBand } from '../RequestBand';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventItem } from '../EventItem';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

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

  addEvent(eventItem:EventItem):Observable<EventItem>{
    return this.httpClient.post<EventItem>("http://localhost:8085/addEvents",eventItem,httpOptions).pipe();
  }
}
