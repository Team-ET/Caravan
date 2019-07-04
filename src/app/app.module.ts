import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule} from 'angular-bootstrap-md';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { TripsModule } from './trips/trips.module';
import { ROUTES } from "./app.routes";
import { Trip } from './models';
import { SuccessAlertComponent } from './main/components/success-alert/success-alert.component';
import { CardsFreeModule } from 'angular-bootstrap-md';
import { AccountModule } from './account/account.module';

@NgModule({
  imports: [
    CardsFreeModule.forRoot(),
    TripsModule,
    MDBBootstrapModule.forRoot(),
    AuthModule,
    MainModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    AccountModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}

