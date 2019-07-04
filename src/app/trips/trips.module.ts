import { CalendarComponent } from 'src/app/trips/components/calendar/calendar.component';
import { TripThumbnailComponent } from './components/thumbnail/trip-thumbnail.component';
import { TripMembersComponent } from './components/members/trip-members.component';
import { TripDetailComponent } from './components/detail/trip-detail.component';
import { TripCreateComponent } from './components/create/trip-create.component';
import { TripFormComponent } from './components/form/trip-form.component';
import { ChatComponent } from './components/chat/chat.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { TripsService } from './services/trips.service';
import { ChatService } from './services/chat.service';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NavbarModule,
  DropdownModule,
  CardsFreeModule,
  ModalModule,
  ButtonsModule,
  IconsModule
} from 'angular-bootstrap-md';



@NgModule({
  exports: [
    TripCreateComponent,
    TripThumbnailComponent,
  ],
  imports: [
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule,
    ReactiveFormsModule,
    CardsFreeModule,
    FormsModule,
    DropdownModule,
    ButtonsModule,
    RouterModule,
    CommonModule,
    NavbarModule,
    IconsModule,
    ModalModule,
  ],
  declarations: [
    TripThumbnailComponent,
    TripMembersComponent,
    TripCreateComponent,  
    TripDetailComponent,
    TripFormComponent,
    CalendarComponent,
    ChatComponent,
  ],
  providers: [TripsService, ChatService]
})
export class TripsModule { }