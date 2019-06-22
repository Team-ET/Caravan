import { Routes } from "@angular/router";
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