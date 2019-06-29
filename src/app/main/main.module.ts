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
import { WidgetComponent } from './components/widget/widget.component';
import { NavComponent } from './components/nav/nav.component'
import { SearchComponent } from './components/search/search.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';


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
    CarouselModule
  ],
  declarations: [
    SearchComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    DashComponent,
    WidgetComponent,
    NavComponent,
    ProfilePictureComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    WidgetComponent,
    NavComponent,
  ]
})
export class MainModule {}
