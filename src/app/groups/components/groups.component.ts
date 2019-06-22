import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD:src/app/groups/groups.component.ts
import { Group } from '../group';
// import { GROUPS } from '../mock-groups';
import { GroupsService } from './groups.service';
import { Router } from '@angular/router';
=======
import { Group } from '../models/group';
import { GroupsService } from '../services/groups.service';
>>>>>>> b667013e6c7a9363d83b4f84bb2c4cbfc0317c11:src/app/groups/components/groups.component.ts

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  providers: [ GroupsService ],
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups: Group[];
  trips: Group[];
  // editGroup: Group; // the hero currently being edited

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
        console.log('getting groups', groups);
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
