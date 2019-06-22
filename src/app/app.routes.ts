import { Routes } from "@angular/router";
<<<<<<< HEAD
import { HomeComponent } from "./home/home.component";
import { CallbackComponent } from "./callback/callback.component";
import { GroupDetailComponent } from './group-detail/group-detail.component';

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "callback", component: CallbackComponent },
  { path: "**", redirectTo: "" },
  { path: 'detail/:name', component: GroupDetailComponent}
];
=======
import { MainComponent } from "./core/main/main.component"
import { LoginComponent } from "./auth/components/login/login.component";
// import { TripComponent } from "./trip/trip.component"
// import { InsightComponent } from "./insight/insight.component"
import { NotFoundComponent } from "./core/not-found/not-found.component"
import { AuthGuard } from './auth/guards/auth.guard';


export const ROUTES: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'main', component: MainComponent/*, canActivate: [AuthGuard]*/},
  // { path: "trip", component: TripComponent, canActivate: [AuthGuard] },
  // { path: "insight", component: InsightComponent, canActivate: [AuthGuard] },
  { path: "**", component: NotFoundComponent }
];
>>>>>>> b667013e6c7a9363d83b4f84bb2c4cbfc0317c11
