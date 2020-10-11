import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../_helpers/api-services.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.less']
})
export class EventsListComponent implements OnInit {
  event_items = null;

  constructor(private apiService: ApiServicesService) {}

  ngOnInit() {
    this.apiService.getEvents().subscribe((data) =>{
      this.event_items = data;
    });
  }

  deleteItem(id: string) {
    this.apiService.deleteEvent(id).subscribe();
  }

}
