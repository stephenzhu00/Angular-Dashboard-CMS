import { Injectable } from '@angular/core';
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

  constructor(private httpClient:HttpClient) { 
  }

  getEvents(){
    return this.httpClient.get("http://bebas.monster/show/");
  }
  getEventById(eventId){
    return this.httpClient.get("http://bebas.monster/show/"+eventId);
  } 
  addEvent(eventItem:EventItem):Observable<EventItem>{
    return this.httpClient.post<EventItem>("http://bebas.monster/show/",eventItem,httpOptions).pipe();
  }
  deleteEvent(id):Observable<{}>{
    return this.httpClient.delete("http://bebas.monster/show/"+id).pipe();
  }
  updateEvent(id:string,eventItem:EventItem):Observable<EventItem>{
    return this.httpClient.put<EventItem>("http://bebas.monster/show/"+id, eventItem, httpOptions).pipe();
  }

  getRequests(){
    return this.httpClient.get("http://bebas.monster/quotation");
  }
  deleteRequest(id):Observable<{}>{
    return this.httpClient.delete("http://bebas.monster/quotation/"+id).pipe();
  }
}
