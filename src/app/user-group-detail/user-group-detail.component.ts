import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models';
import { GroupsService } from '../groups/services/groups.service';


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

  constructor(readonly route: ActivatedRoute, private groupService: GroupsService) {
    this.profile = window.history.state.profile[0];
    this.route.params.subscribe(params => {
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
