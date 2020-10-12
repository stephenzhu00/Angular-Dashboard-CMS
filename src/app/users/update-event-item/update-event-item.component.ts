import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { AlertService } from '../../_services/alert.service';
import { ApiServicesService } from '../../_helpers/api-services.service';

@Component({
  selector: 'app-update-event-item',
  templateUrl: './update-event-item.component.html',
  styleUrls: ['./update-event-item.component.less']
})
export class UpdateEventItemComponent implements OnInit  {
  form: FormGroup;
  id: string;
  loading = false;
  submitted = false;
  eventItem=null;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService,
      private apiService:ApiServicesService,
  ) {}

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
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
      this.eventItem = this.apiService.getEventById(this.id).subscribe((data)=>{        
        this.eventItem = data[0];
        this.form.patchValue({
          title:this.eventItem.title,
          artist:this.eventItem.artist,
          day:this.eventItem.day,
          date:this.cvtDate(this.eventItem.date),
          timeStart:this.cvtTime(this.eventItem.timeStart),
          timeStop:this.cvtTime(this.eventItem.timeStop),
          price:this.eventItem.price,
          showPicture:this.eventItem.showPicture,
          address:this.eventItem.address,
          addressDetail:this.eventItem.addressDetail,
          showDetail:this.eventItem.showDetail,

        });
      });
  }
  public cvtTimeAMPM(tempTime): string{
    var timeString = tempTime;
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(2, 0) +" "+ ampm;
    return timeString;
  }

  cvtDate(tempDate){
    var year= tempDate.substr(0,4);
    var month = tempDate.substr(5,2);
    var date = tempDate.substr(8,2);
    return year + "-"+month+"-"+date;
  }
  cvtTime(tempTime){
    var hours = Number(tempTime.match(/^(\d+)/)[1]);
    var AP = tempTime.match(/\s(.*)$/);
    if (!AP) AP = tempTime.slice(-2);
    else AP=AP[1];
    if(AP == "PM" && hours<12) hours = hours+12;
    if(AP == "AM" && hours==12) hours = hours-12;
    var Hours24 = hours.toString();
    if(hours<10) Hours24 = "0" + Hours24;
    return Hours24 + ":00" ;
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      this.alertService.clear();
      if (this.form.invalid) {
          return;
      }
      this.loading = true;
      this.updateUser();
  }
  private updateUser() {
    this.alertService.success('Update successful', { keepAfterRouteChange: true });
    this.router.navigate(['../../'], { relativeTo: this.route });
    this.form.value.timeStart = this.cvtTimeAMPM(this.form.value.timeStart);
    this.form.value.timeStop = this.cvtTimeAMPM(this.form.value.timeStop);
    this.apiService.updateEvent(this.id, this.form.value).subscribe();
  }
}
