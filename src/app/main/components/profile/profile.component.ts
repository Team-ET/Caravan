import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() profile: any;
  values: object;

  constructor(public auth: AuthService, public userService: UserService) { }

  ngOnInit() {
    const { sub } = this.profile;
    if (sub[0] === 't') {
      this.getTwitterPersonality(sub);
    } else {
      this.getStoredPersonality(sub);
    }
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

  getTwitterPersonality(sub: string): any {
    this.userService.makeTwitterCall(sub)
    .subscribe((values) => {
      this.values = values;
      console.log('success', values, this.values);
    });
  }

  getStoredPersonality(sub: string): any {
    this.userService.getUserValues(sub)
    .subscribe((values) => {
      this.values = values;
      console.log('success', values, this.values);
    });
  }

}
