import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from './user.service';
@Component({
 selector: 'app-main',
 templateUrl: './main.component.html',
 styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
 profile: any;
 constructor(public auth: AuthService, public userService: UserService) {
 }
 ngOnInit() {
   if (this.auth.isAuthenticated()) {
     this.loadProfile();
   } else {
     this.auth.login();
   }
 }
 loadProfile() {
   if (this.userService.getUser() != null) {
     this.profile = this.userService.getUser();
   } else {
     if (this.auth.userProfile) {
       this.profile = this.auth.userProfile;
       this.userService.setUser(this.profile);
     } else {
       this.auth.getProfile((err, profile) => {
         console.log('STORING PROFILE', profile);
         this.userService.storeProfile(profile);
         this.profile = profile;
         this.userService.setUser(this.profile);
       });
     }
   }
 }
}