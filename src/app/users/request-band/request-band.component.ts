import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiServicesService } from '../../_helpers/api-services.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-request-band',
  templateUrl: './request-band.component.html',
  styleUrls: ['./request-band.component.less']
})
export class RequestBandComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'bandName','createdDate','expiredDate', 'status'];
  request_list = this.apiService.getRequests();
  dataSource = new MatTableDataSource(this.request_list);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService:ApiServicesService){
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
// export class RequestBandComponent implements OnInit,AfterViewInit {
//   requests_list;
//   displayedColumns:string[];
//   dataSource =null;
//   constructor(private apiService:ApiServicesService) {
//     this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
//     this.dataSource = ELEMENT_DATA;
//    }
//   @ViewChild(MatSort) sort: MatSort;

//   ngAfterViewInit() {
//     this.dataSource.sort = this.sort;
//   }
//   ngOnInit(): void {
//     this.requests_list = this.apiService.getRequests();
//   }

// }
