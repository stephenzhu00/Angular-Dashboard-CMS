import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { AddEventItemComponent } from './add-event-item/add-event-item.component';
import { UpdateEventItemComponent } from './update-event-item/update-event-item.component';
import { EventsListComponent } from './events-list/events-list.component';
import { RequestBandComponent } from './request-band/request-band.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent,
        AddEventItemComponent,
        UpdateEventItemComponent,
        EventsListComponent,
        RequestBandComponent
    ]
})
export class UsersModule { }