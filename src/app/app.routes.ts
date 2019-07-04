import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component"
import { LoginComponent } from "./auth/components/login/login.component";
// import { TripComponent } from "./trip/trip.component"
// import { InsightComponent } from "./insight/insight.component"
import { AuthGuard } from './auth/guards/auth.guard';
import { GroupDetailComponent } from './groups/components/detail/group-detail.component';
import { GroupFormComponent } from './groups/components/form/group-form.component';
import { AccountComponent } from './account/account.component';

export const ROUTES: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'main', component: MainComponent/*, canActivate: [AuthGuard]*/},
  // { path: "trip", component: TripComponent, canActivate: [AuthGuard] },
  // { path: "insight", component: InsightComponent, canActivate: [AuthGuard] },
  { path: 'detail/:groupId', component: GroupDetailComponent },
  { path: 'group/signup', component: GroupFormComponent },
  { path: 'account', component: AccountComponent }
  // { path: "**", component: NotFoundComponent },
];
