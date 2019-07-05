import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Group } from '../models';
import { GroupsService } from '../groups/services/groups.service';
import { UserService } from '../main/user.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
  providers: [GroupsService, AuthService]
})
export class GroupDetailComponent implements OnInit {
  profile: any;
  groupId: number;
  group: Group; // model

  constructor(
    readonly route: ActivatedRoute,
    private groupService: GroupsService,
    private userService: UserService,
    private auth: AuthService) {

  }
  
  // subsribe to the the id param in the route, set it as groupId, and get group from database using groupId
  ngOnInit() {
    this.profile = window.history.state.profile[0];
    this.route.params.subscribe(params => {
    this.groupId = params.groupId;
    this.getGroupById(this.groupId);
    });
  }

  getGroupById(id: number) {
    this.groupService.getGroup(id).subscribe(result => {
      this.group = result;
    });
  }

  sendRequest() {
    console.log('SENDING REQUEST');
    this.userService.addUser(this.groupId, this.profile.sub, true);
  }

}
