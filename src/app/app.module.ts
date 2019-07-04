import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule, ModalModule } from 'angular-bootstrap-md';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { ROUTES } from "./app.routes";
import { HttpErrorHandler } from './http-error-handler.service';
import { ChatService } from './chat.service';
import { Group } from './models';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { CardsFreeModule } from 'angular-bootstrap-md';
import { AccountModule } from './account/account.module';
import { MessageService } from './message.service';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    CardsFreeModule.forRoot(),
    GroupsModule,
    MDBBootstrapModule.forRoot(),
    AuthModule,
    MainModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    GroupsModule,
    ModalModule,
    AccountModule,
  ],
  declarations: [
    AppComponent,
    SuccessAlertComponent,
    ChatComponent],
  providers: [HttpErrorHandler, ChatService, MessageService],
  bootstrap: [AppComponent],
  
})
export class AppModule {}

