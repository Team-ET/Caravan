import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

import { ROUTES } from "./app.routes";

import { AuthService } from "./auth/auth.service";
import { CallbackComponent } from "./callback/callback.component";
import { PingComponent } from './ping/ping.component';
import { GroupsComponent } from './groups/groups.component';
import { ApiClient } from './api-client';

@NgModule({
  declarations: [AppComponent, HomeComponent, CallbackComponent, PingComponent, GroupsComponent, ApiClient],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}

