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
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReferencesComponent } from './components/references/references.component';
import { VerificationComponent } from './components/verification/verification.component';



@NgModule({
  declarations: [ReviewsComponent, ReferencesComponent, VerificationComponent],
  imports: [
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
  providers: [AuthService]
})
export class AccountModule { }
