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
//test
import { ROUTES } from "./app.routes";
import { HttpErrorHandler } from './http-error-handler.service';
import { ChatService } from './chat.service';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupUsersModule } from './group-users/group-users.module';
import { Group } from './models';
import { GroupNewComponent } from './group-new/group-new.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { CardsFreeModule } from 'angular-bootstrap-md';
import { AccountModule } from './account/account.module';
import { MessageService } from './message.service';
import { ChatComponent } from './chat/chat.component';
import { UserGroupDetailComponent } from './user-group-detail/user-group-detail.component';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { cloudinaryOptions } from './cloudinary.variables';
import * as  Cloudinary from 'cloudinary-core';

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
    GroupUsersModule,
    ModalModule,
    AccountModule,
    CloudinaryModule.forRoot(Cloudinary, cloudinaryOptions)
  ],
  declarations: [
    AppComponent,
    GroupDetailComponent,
    GroupFormComponent,
    SuccessAlertComponent,
    GroupNewComponent,
    ChatComponent,
    UserGroupDetailComponent],
  providers: [HttpErrorHandler, ChatService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}

