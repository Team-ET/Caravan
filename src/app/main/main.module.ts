import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TripsModule } from '../trips/trips.module';
import {
  NavbarModule,
  DropdownModule,
  CardsFreeModule,
  CarouselModule,
  ButtonsModule,
  ModalModule,
  IconsModule,
} from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { DashComponent } from './components/dash/dash.component';
import { NavComponent } from './components/nav/nav.component'
import { SearchComponent } from './components/search/search.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { WidgetComponent } from './components/widget/widget.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { SuccessAlertComponent } from './components/success-alert/success-alert.component';




@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    IconsModule,
    RouterModule,
    DropdownModule.forRoot(),
    CardsFreeModule,
    ButtonsModule,
    TripsModule,
    CarouselModule,
    ModalModule,
    FormsModule,
    NgbModalModule,
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
    SuccessAlertComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    WidgetComponent,
    NavComponent,
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
  ]
})
export class MainModule {}
