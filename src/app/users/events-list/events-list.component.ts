import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '../../_services/account.service';
import { ApiServicesService } from '../../_helpers/api-services.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.less']
})
export class EventsListComponent implements OnInit {
  event_items = null;

  constructor(private accountService: AccountService,
              private apiService: ApiServicesService
    ) {}

  ngOnInit() {
    this.apiService.getEvents().subscribe((data)=>{
      console.log(data);
      this.event_items = data;
    });
  }

  deleteItem(id: string) {
    console.log("DElete");
    this.apiService.deleteEvent(id).subscribe();
  }

}
