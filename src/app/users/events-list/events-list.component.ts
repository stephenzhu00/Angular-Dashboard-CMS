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
    this.event_items= this.apiService.getEvents();
  }

  deleteItem(id: string) {
      // const user = this.users.find(x => x.id === id);
      // user.isDeleting = true;
      // this.accountService.delete(id)
      //     .pipe(first())
      //     .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }

}
