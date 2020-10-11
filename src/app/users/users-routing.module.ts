import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { AddEventItemComponent } from './add-event-item/add-event-item.component';
import { UpdateEventItemComponent } from './update-event-item/update-event-item.component';
import { EventsListComponent } from './events-list/events-list.component';
import { RequestBandComponent } from './request-band/request-band.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'add', component: AddEditComponent },
            { path: 'edit/:id', component: AddEditComponent },
            { path: 'events', component:EventsListComponent},
            { path: 'events/add',component:AddEventItemComponent},
            { path: 'events/:id',component:UpdateEventItemComponent},
            { path: 'request',component:RequestBandComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }