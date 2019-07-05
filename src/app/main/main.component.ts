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
    // this.auth.handleAuthentication();
   }

  ngOnInit() {
    // if (this.auth.isAuthenticated()) {
    //   this.auth.renewTokens();
    // }
    this.loadProfile();
    this.auth.getProfile((err, profile) => {
      console.log('STORING PROFILE', profile);
      this.userService.storeProfile(profile);
    });
  }

  loadProfile() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
      this.profile = profile;
    });
    }
  }

}
