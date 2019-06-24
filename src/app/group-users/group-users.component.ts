import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models';
import { GroupsService } from '../groups/services/groups.service';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.scss'],
  providers: [GroupsService]
})
export class GroupUsersComponent implements OnInit {
  @Input() groupId: number;

  users: User[] = [];


  constructor(private groupService: GroupsService) { }

  ngOnInit() {
    if (this.groupId) {
      this.loadUsers(this.groupId);
    }
  }

  loadUsers(groupId: number) {
    this.groupService.getGroupUsers(groupId).subscribe(result => {
      this.users = result;
      console.log(result);
    });
  }

}
