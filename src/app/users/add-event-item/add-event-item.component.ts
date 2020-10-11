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
  id: string;
  isAddMode: boolean;
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
      this.isAddMode = !this.id;

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

      if (!this.isAddMode) {
        this.eventItem = this.apiService.getEventById(this.id);
        this.form.patchValue({
          title:this.eventItem.title,
          artist:this.eventItem.artist,
          price:this.eventItem.price,
          URLVideo:this.eventItem.id,
          address:this.eventItem.address,
          addressDetail:this.eventItem.addressDetail,
          showDetail:this.eventItem.showDetail,

        });
        console.log(this.eventItem);
      }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      // this.loading = true;
      // if (this.isAddMode) {
          this.createEvent();
      // } else {
      //     this.updateUser();
      // }
  }

  private createEvent() {
    this.alertService.success('Event added successfully', { keepAfterRouteChange: true });
    this.router.navigate(['../'], { relativeTo: this.route });
    console.log("ADD ITEM");
    console.log(this.form.value);
    this.apiService.addEvent(this.form.value).subscribe();
  }

}
