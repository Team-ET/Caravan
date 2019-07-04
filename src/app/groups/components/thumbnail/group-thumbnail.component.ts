import { Component, OnInit } from '@angular/core';
import { Group } from '../../../models/group';
import { GroupsService } from '../../services/groups.service';
import { mockGroup } from '../../services/mockGroup';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './groups-thumbnail.html',
  providers: [ GroupsService ],
  styleUrls: ['./group-thumbnail.scss']
})
export class GroupThumbnailComponent implements OnInit {
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
