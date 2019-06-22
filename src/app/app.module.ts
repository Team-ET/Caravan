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
import { ButtonComponent } from './button/button.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

@NgModule({
<<<<<<< HEAD
<<<<<<< HEAD
  declarations: [AppComponent, HomeComponent, CallbackComponent, PingComponent, GroupsComponent, ButtonComponent, GroupDetailComponent],
=======
  declarations: [AppComponent ],
>>>>>>> b667013e6c7a9363d83b4f84bb2c4cbfc0317c11
=======
  declarations: [AppComponent ],
>>>>>>> b667013e6c7a9363d83b4f84bb2c4cbfc0317c11
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

