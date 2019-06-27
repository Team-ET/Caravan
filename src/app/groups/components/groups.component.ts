import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  providers: [ GroupsService ],
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups: Group[];
  trips: Group[];

  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    console.log('initializing groups');
    this.getGroupMatches();
    this.getUserTrips();
  }

  // functioncall(e: MouseEvent) {
  //   this.router.navigate()
  // }

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
        this.trips = trips;
      });
  }

  

}
