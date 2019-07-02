import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GroupsModule } from '../groups/groups.module';
import {
  NavbarModule,
  DropdownModule,
  CardsFreeModule,
  CarouselModule,
  ButtonsModule,
  IconsModule,
  ModalModule
} from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { DashComponent } from './components/dash/dash.component';
import { NavComponent } from './components/nav/nav.component'
import { SearchComponent } from './components/search/search.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
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
    DropdownModule.forRoot(),
    CardsFreeModule,
    ButtonsModule,
    GroupsModule,
    CarouselModule,
    // FormsModule,
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
    ProfilePictureComponent,
    NavComponent,
    SearchComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    DashComponent,
    WidgetComponent,
    DemoComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    WidgetComponent,
    NavComponent,
    DemoComponent,
  ]
})
export class MainModule {}
