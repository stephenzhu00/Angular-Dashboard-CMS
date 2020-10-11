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
          date:['', Validators.required],
          day:['', Validators.required],
          timeStart: ['',Validators.required],
          timeStop:['',Validators.required],
          price:['',Validators.required],
          showPicture:['',Validators.required],
          address:['',Validators.required],
          addressDetail:['',Validators.required],
          showDetail:['',Validators.required]
      });
  }

  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      this.alertService.clear();
      var tempTimeStart = this.form.value.timeStart+':00';
      var tempTimeStop = this.form.value.timeStop+':00';
      this.form.value.timeStart = this.cvtTimeAMPM(tempTimeStart);
      this.form.value.timeStop = this.cvtTimeAMPM(tempTimeStop);
      if (this.form.invalid) {
          return;
      }
      this.createEvent();
  }

  public cvtTimeAMPM(tempTime): string{
    var timeString = tempTime;
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
  }

  private createEvent() {
    this.alertService.success('Event Created successfully', { keepAfterRouteChange: true });
    this.router.navigate(['../'], { relativeTo: this.route });
    this.apiService.addEvent(this.form.value).subscribe();
  }

}
