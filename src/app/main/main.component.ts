import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public auth: AuthService) {
    // this.auth.handleAuthentication();
   }

  ngOnInit() {
    // if (this.auth.isAuthenticated()) {
    //   this.auth.renewTokens();
    // }
    console.log(this.auth);
  }

}
