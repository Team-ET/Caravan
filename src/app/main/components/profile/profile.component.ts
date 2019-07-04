import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() profile: any;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    // if (this.auth.isAuthenticated()) {
    //   this.auth.renewTokens();
    //   this.loadProfile();
    // }
    // this.loadProfile();
    // this.auth.getProfile((err, profile) => {
    //   console.log('STORING PROFILE', profile);
    //   this.storeProfile(profile);
    // });
    console.log('PROFILE', this.profile);
  }

  loadProfile() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
      this.profile = profile;
    });
    }
    // console.log('PROFILE', this.auth.userProfile);
  }

  // storeProfile(user) {
  //   console.log('USER', user);
  //   this.profileService.createUser(user);
  // }

}
