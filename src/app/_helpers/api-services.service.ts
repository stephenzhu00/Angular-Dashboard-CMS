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
    return this.httpClient.get('http://localhost:8080/show/');
  }
  getEventById(eventId){
    return this.httpClient.get('http://localhost:8080/show/'+eventId);
  }
  getRequests(){
    return this.httpClient.get('http://localhost:8080/quotation');
  }

  addEvent(eventItem:EventItem):Observable<EventItem>{
    console.log("GOINT TO DAY");
    return this.httpClient.post<EventItem>("http://localhost:8080/addEvent",eventItem,httpOptions).pipe();
  }

  deleteEvent(id):Observable<{}>{
    console.log(id);
    return this.httpClient.delete("http://localhost:8080/delete/"+id).pipe();
  }
  updateEvent(id:string,eventItem:EventItem):Observable<EventItem>{
    console.log("Update with"+id);
    console.log(eventItem);
    return this.httpClient.put<EventItem>("http://localhost:8080/update/"+id, eventItem, httpOptions).pipe();
  }
}
