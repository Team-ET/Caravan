import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './components/profile/profile.component'
import { GroupsModule } from '../groups/groups.module'

import {
  NavbarModule,
  DropdownModule,
  CardsFreeModule,
  ButtonsModule,
  IconsModule
} from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { DashComponent } from './components/dash/dash.component'
import { NotFoundComponent } from './not-found/not-found.component';



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
  ],
  declarations: [
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    DashComponent,
    NotFoundComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
  ]
})
export class CoreModule { }