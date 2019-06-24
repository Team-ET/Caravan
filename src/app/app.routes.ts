import { Routes } from "@angular/router";
import { MainComponent } from "./core/main/main.component"
import { LoginComponent } from "./auth/components/login/login.component";
// import { TripComponent } from "./trip/trip.component"
// import { InsightComponent } from "./insight/insight.component"
import { NotFoundComponent } from "./core/not-found/not-found.component"
import { AuthGuard } from './auth/guards/auth.guard';
import { GroupDetailComponent } from '../app/group-detail/group-detail.component';
import { GroupFormComponent } from '../app/group-form/group-form.component';

export const ROUTES: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'callback', component: LoginComponent},
  { path: 'main', component: MainComponent/*, canActivate: [AuthGuard]*/},
  // { path: "trip", component: TripComponent, canActivate: [AuthGuard] },
  // { path: "insight", component: InsightComponent, canActivate: [AuthGuard] },
  { path: 'detail/:groupId', component: GroupDetailComponent },
  { path: 'group/signup', component: GroupFormComponent },
  { path: "**", component: NotFoundComponent },
];
