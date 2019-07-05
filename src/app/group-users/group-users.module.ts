import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupUsersComponent } from './group-users.component';
import {
  NavbarModule,
  DropdownModule,
  CardsFreeModule,
  ButtonsModule,
  IconsModule,
  ModalModule
} from 'angular-bootstrap-md';

@NgModule({
  declarations: [GroupUsersComponent],
  imports: [
    CardsFreeModule,
    CommonModule,
    ButtonsModule,
    IconsModule,
    ModalModule,
    NavbarModule,
    DropdownModule,
  ],
  exports: [
    GroupUsersComponent
  ]
})
export class GroupUsersModule { }
