import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {
  @Input() profile: any;

  constructor() { }

  ngOnInit() {
    console.log('PROFILEPIC', this.profile);
  }

}
