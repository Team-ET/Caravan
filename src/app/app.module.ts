import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ROUTES } from "./app.routes";
import { AuthService } from "./auth/auth.service";
import { CallbackComponent } from "./callback/callback.component";
import { PingComponent } from './ping/ping.component';
import { GroupsComponent } from './groups/groups.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { ButtonComponent } from './button/button.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, CallbackComponent, PingComponent, GroupsComponent, ButtonComponent, GroupDetailComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService, HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}

