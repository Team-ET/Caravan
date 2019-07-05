import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(public auth: AuthService, public profileService: ProfileService) { }

  ngOnInit() {
    // if (this.auth.isAuthenticated()) {
    //   this.auth.renewTokens();
    //   this.loadProfile();
    // }
    this.loadProfile();
    this.storeProfile(this.profile);
  }
  loadProfile() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
      this.profile = profile;
    });
    }
    console.log(this.profile);
  }

  storeProfile(user) {
    this.profileService.createUser(user);
  }
}
