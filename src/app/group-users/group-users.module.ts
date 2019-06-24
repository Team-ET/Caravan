import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupUsersComponent } from './group-users.component';

@NgModule({
  declarations: [GroupUsersComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GroupUsersComponent
  ]
})
export class GroupUsersModule { }
