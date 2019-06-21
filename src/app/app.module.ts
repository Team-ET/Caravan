import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HttpClientModule } from '@angular/common/http';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module'

import { ROUTES } from "./app.routes";

import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';

@NgModule({
  declarations: [AppComponent ],
  imports: [
    GroupsModule,
    MDBBootstrapModule.forRoot(),
    AuthModule,
    CoreModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}

