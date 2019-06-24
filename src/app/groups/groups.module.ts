import { GroupsComponent } from './components/groups.component';
import { GroupsService } from './services/groups.service'
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NavbarModule,
  DropdownModule,
  CardsFreeModule,
  ButtonsModule,
  IconsModule
} from 'angular-bootstrap-md';


@NgModule({
  imports: [CommonModule,
    NavbarModule,
    DropdownModule,
    CardsFreeModule,
    ButtonsModule,
    IconsModule],
  declarations: [GroupsComponent],
  exports: [GroupsComponent],
  providers: [GroupsService]
})
export class GroupsModule { }