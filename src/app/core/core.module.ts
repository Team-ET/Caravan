import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GroupsModule } from '../groups/groups.module';
import { RouterModule } from '@angular/router';
import { DashComponent } from './components/dash/dash.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import {
  NavbarModule,
  DropdownModule,
  CardsFreeModule,
  ButtonsModule,
  IconsModule,
  ModalModule
} from 'angular-bootstrap-md';

import { WidgetComponent } from './components/widget/widget.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoComponent } from 'src/app/calendar/calendar.component';




@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    IconsModule,
    RouterModule,
    DropdownModule.forRoot(),//test
    CardsFreeModule,
    ButtonsModule,
    GroupsModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    // NoopAnimationsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    ProfileComponent,//test
    HeaderComponent,
    FooterComponent,
    MainComponent,
    DashComponent,
    NotFoundComponent,
    WidgetComponent,
    DemoComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    WidgetComponent,
    DemoComponent,
  ]
})
export class CoreModule { }