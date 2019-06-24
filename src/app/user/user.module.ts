import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [{path:":userId", component: UserComponent}];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
