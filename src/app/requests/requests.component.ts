import { Component, OnInit, Input } from '@angular/core';
import { GroupsService } from '../groups/services/groups.service';
import { User } from '../models';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  @Input() profile: any;
  requests: User[];

  constructor(private groupService: GroupsService) { }

  ngOnInit() {
    this.loadRequests(this.profile.sub);
  }
  
  loadRequests(sub: string): void {
    this.groupService.getRequests(sub)
      .subscribe(requests => {
        console.log('getting requests', requests);
        this.requests = requests;
        // this.trips.push(mockGroup);
      });
  }

  // update a user who has requested membership in a group's pending status to false (making them a group member)
  addGroupMember(sub: string, groupId: number): void {
    this.groupService.updateGroupRequest(sub, groupId)
      .subscribe(result => {
        console.log('updating membership', result);
        // this.trips.push(mockGroup);
      });
  }

  onOpen(event: any) {
    console.log(event);
  }

}
