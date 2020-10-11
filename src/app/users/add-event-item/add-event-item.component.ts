import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { AlertService } from '../../_services/alert.service';
import { ApiServicesService } from '../../_helpers/api-services.service';

@Component({
  selector: 'app-add-event-item',
  templateUrl: './add-event-item.component.html',
  styleUrls: ['./add-event-item.component.less']
})
export class AddEventItemComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  eventItem= null;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService,
      private apiService: ApiServicesService,
  ) {}

  ngOnInit() {
      this.form = this.formBuilder.group({
          title: ['', Validators.required],
          artist: ['', Validators.required],
          timeStart: ['',Validators.required],
          timeStop:['',Validators.required],
          price:['',Validators.required],
          URLVideo:['',Validators.required],
          address:['',Validators.required],
          addressDetail:['',Validators.required],
          showDetail:['',Validators.required]
      });
  }

  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      this.alertService.clear();
      if (this.form.invalid) {
          return;
      }
      this.createEvent();
  }

  private createEvent() {
    this.alertService.success('Event Created successfully', { keepAfterRouteChange: true });
    this.router.navigate(['../'], { relativeTo: this.route });
    this.apiService.addEvent(this.form.value).subscribe();
  }

}
