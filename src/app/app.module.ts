import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

import { ROUTES } from "./app.routes";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
    CoreModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

