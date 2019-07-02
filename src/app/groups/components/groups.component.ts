import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { GroupsService } from '../services/groups.service';
import { mockGroup } from '../services/mockGroup';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  providers: [ GroupsService ],
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups: Group[];
  // trips: Group[];
  trips: Group[] = [];

  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    this.getGroupMatches();
    this.getUserTrips();
  }

  getGroupMatches(): void {
    this.groupsService.getGroupMatches()
      .subscribe(groups => {
        // console.log('getting groups', groups);
        this.groups = groups;
      });
  }

  getUserTrips(): void {
    this.groupsService.getUserTrips()
      .subscribe(trips => {
        console.log('getting trips', trips);
        // this.trips = trips;
        this.trips.push(mockGroup);
      });
  }

}
