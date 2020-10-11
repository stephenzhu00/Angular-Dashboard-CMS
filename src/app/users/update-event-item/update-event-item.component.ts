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
export class UpdateEventItemComponent implements OnInit {
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
          eventTitle: ['', Validators.required],
          eventArtist: ['', Validators.required],
          timeStart: ['',Validators.required],
          timeStop:['',Validators.required],
          price:['',Validators.required],
          URLVideo:['',Validators.required],
          address:['',Validators.required],
          addressDetail:['',Validators.required],
          eventDetail:['',Validators.required]
      });

      if (!this.isAddMode) {
        this.eventItem = this.apiService.getEventById(this.id).subscribe((data)=>{        
          this.eventItem = data;
          this.form.patchValue({
            eventTitle:this.eventItem.title,
            eventArtist:this.eventItem.artist,
            price:this.eventItem.price,
            URLVideo:this.eventItem.id,
            address:this.eventItem.address,
            addressDetail:this.eventItem.addressDetail,
            eventDetail:this.eventItem.showDetail,
  
          });
        });
      }
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
    this.apiService.updateEvent(this.form.value.id, this.form.value).subscribe();
  }
}
