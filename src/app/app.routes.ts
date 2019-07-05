import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component"
import { LoginComponent } from "./auth/components/login/login.component";
// import { TripComponent } from "./trip/trip.component"
// import { InsightComponent } from "./insight/insight.component"
import { AuthGuard } from './auth/guards/auth.guard';
import { GroupDetailComponent } from '../app/group-detail/group-detail.component';
import { GroupFormComponent } from '../app/group-form/group-form.component';
import { AccountComponent } from './account/account.component';
import { UserGroupDetailComponent } from './user-group-detail/user-group-detail.component';
import { GroupAllComponent } from 'src/app/group-all/group-all.component'

export const ROUTES: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'main', component: MainComponent/*, canActivate: [AuthGuard]*/},
  // { path: "trip", component: TripComponent, canActivate: [AuthGuard] },
  // { path: "insight", component: InsightComponent, canActivate: [AuthGuard] },
  { path: 'detail/:groupId', component: GroupDetailComponent },
  { path: 'my-trips/:groupId', component: UserGroupDetailComponent},
  { path: 'group/signup', component: GroupFormComponent },
  { path: 'account', component: AccountComponent },
  { path: 'group-all', component: GroupAllComponent},
  // { path: "**", component: NotFoundComponent },
];
