import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../../models/group';
import { GroupsService } from '../services/groups.service';
import { mockGroup } from '../services/mockGroup';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [ GroupsService ]
})
export class GroupsComponent implements OnInit {
  @Input() profile: any;
  groups: Group[];
  trips: Group[];
  // trips: Group[] = [];

  constructor(private groupsService: GroupsService) {
  }

  ngOnInit() {
    this.getGroupMatches();
    this.getUserTrips(this.profile.sub);
  }

  getGroupMatches(): void {
    this.groupsService.getGroupMatches()
      .subscribe(groups => {
        // console.log('getting groups', groups);
        this.groups = groups;
      });
  }

  getUserTrips(sub): void {
    this.groupsService.getUserTrips(sub)
      .subscribe(trips => {
        console.log('getting trips', trips);
        this.trips = trips;
        // this.trips.push(mockGroup);
      });
  }

}
