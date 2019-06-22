import { GroupsComponent } from './components/groups.component';
import { GroupsService } from './services/groups.service'
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [CommonModule],
  declarations: [GroupsComponent],
  exports: [GroupsComponent],
  providers: [GroupsService]
})
export class GroupsModule { }