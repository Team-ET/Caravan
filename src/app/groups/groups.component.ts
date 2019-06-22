import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
// import { GROUPS } from '../mock-groups';
import { GroupsService } from './groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  providers: [ GroupsService ],
  styleUrls: ['./groups.component.css']
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
