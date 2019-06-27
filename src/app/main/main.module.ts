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
  ButtonsModule,
  IconsModule,
  ModalModule
} from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { DashComponent } from './components/dash/dash.component';
import { WidgetComponent } from './components/widget/widget.component';

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
    WidgetComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    WidgetComponent,
  ]
})
export class MainModule {}
