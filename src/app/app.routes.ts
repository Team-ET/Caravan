import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CallbackComponent } from "./callback/callback.component";
import { GroupDetailComponent } from './group-detail/group-detail.component';

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "callback", component: CallbackComponent },
  { path: "**", redirectTo: "" },
  { path: 'detail/:name', component: GroupDetailComponent}
];
