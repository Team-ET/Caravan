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

import { RouterModule} from '@angular/router';

@NgModule({
  imports: [CommonModule,
    NavbarModule,
    DropdownModule,
    CardsFreeModule,
    ButtonsModule,
<<<<<<< HEAD
=======
    RouterModule,
>>>>>>> f73c20527e5a237aed43bb03f9e506a49631847a
    IconsModule],
  declarations: [GroupsComponent],
  exports: [GroupsComponent],
  providers: [GroupsService]
})
export class GroupsModule { }