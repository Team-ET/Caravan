import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models';
import { GroupsService } from '../groups/services/groups.service';
import { UserService } from '../main/user.service';


@Component({
  selector: 'app-user-group-detail',
  templateUrl: './user-group-detail.component.html',
  styleUrls: ['./user-group-detail.component.scss'],
  providers: [GroupsService]
})
export class UserGroupDetailComponent implements OnInit {
  profile: any;
  groupId: number;
  group: Group; // model

  constructor(readonly route: ActivatedRoute, private groupService: GroupsService, private userService: UserService) {
    this.profile = this.userService.getUser();
    this.route.params.subscribe(params => {
      console.log(params);
    this.groupId = params.groupId;
    this.getGroupById(this.groupId);
    });
  }

  ngOnInit() {
  }

  getGroupById(id: number) {
    this.groupService.getGroup(id).subscribe(result => {
      this.group = result;
    });
  }

}
