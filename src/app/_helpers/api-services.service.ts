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
    return this.httpClient.get('http://localhost:8080/show/');
  }
  getEventById(eventId){
    return this.httpClient.get('http://localhost:8080/show/'+eventId);
  } 
  getRequests(){
    return this.httpClient.get('http://localhost:8080/quotation');
  }

  addEvent(eventItem:EventItem):Observable<EventItem>{
    return this.httpClient.post<EventItem>("http://localhost:8080/show/",eventItem,httpOptions).pipe();
  }

  deleteEvent(id):Observable<{}>{
    return this.httpClient.delete("http://localhost:8080/delete/"+id).pipe();
  }
  updateEvent(id:string,eventItem:EventItem):Observable<EventItem>{
    return this.httpClient.put<EventItem>("http://localhost:8080/update/"+id, eventItem, httpOptions).pipe();
  }
}
