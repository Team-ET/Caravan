import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { 
  InputsModule, 
  ButtonsModule, 
  CardsFreeModule, 
  IconsModule, 
  WavesModule, 
  InputUtilitiesModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { ReferenceComponent } from './components/reference/reference.component';
import { VerificationComponent } from './components/verification/verification.component';
import { ReviewComponent } from './components/review/review.component';
import { BarRatingModule } from "ngx-bar-rating";
import { AccountComponent } from './account.component'

@NgModule({
  declarations: [ReferenceComponent, VerificationComponent, ReviewComponent, AccountComponent],
  imports: [
    BarRatingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputsModule,
    InputUtilitiesModule,
    ButtonsModule,
    CardsFreeModule,
    WavesModule,
    RouterModule,
    IconsModule,
  ],
  providers: [AuthService],
  exports: [AccountComponent]
})
export class AccountModule { }
