import { GroupCreateComponent } from './components/create/group-create.component';
import { GroupThumbnailComponent } from './components/thumbnail/group-thumbnail.component';
import { GroupDetailComponent } from './components/detail/group-detail.component';
import { GroupFormComponent } from './components/form/group-form.component';
import { GroupUsersModule } from './components/users/group-users.module';
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
  imports: [
    
    CommonModule,
    NavbarModule,
    DropdownModule,
    CardsFreeModule,
    ButtonsModule,
    RouterModule,
    IconsModule],
  declarations: [
    GroupUsersModule,
    GroupCreateComponent,
    GroupThumbnailComponent,
    GroupDetailComponent,
    GroupFormComponent,
  ],
  exports: [GroupCreateComponent],
  providers: [GroupsService]
})
export class GroupsModule { }