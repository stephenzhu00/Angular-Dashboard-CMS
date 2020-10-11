import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServicesService } from '../../_helpers/api-services.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-request-band',
  templateUrl: './request-band.component.html',
  styleUrls: ['./request-band.component.less']
})
export class RequestBandComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'bandName','createdDate','expiredDate', 'status'];
  dataSource= null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: ApiServicesService){
  }
  ngOnInit(): void {
    this.apiService.getRequests().subscribe((data)=>{
      this.dataSource = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
