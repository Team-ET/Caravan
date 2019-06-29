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
import { WidgetComponent } from './components/widget/widget.component';
import {
  NavbarModule,
  DropdownModule,
  CardsFreeModule,
  ButtonsModule,
  IconsModule,
  ModalModule
} from 'angular-bootstrap-md';



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
    FormsModule
  ],
  declarations: [
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    DashComponent,
    NotFoundComponent,
    WidgetComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    WidgetComponent,
  ]
})
export class CoreModule { }