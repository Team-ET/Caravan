import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models';
import { GroupsService } from '../groups/services/groups.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css'],
  providers: [GroupsService]
})
export class GroupDetailComponent implements OnInit {
  groupId: number;
  group: Group;

  constructor(readonly route:ActivatedRoute, private groupService:GroupsService) {

   }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.groupId = params.groupId;
    this.getGroupById(this.groupId);
    });
  }

  getGroupById(id: number) {
    this.groupService.getGroup(id).subscribe(result => {
      this.group = result;
      console.log(result);
    });
  }

}