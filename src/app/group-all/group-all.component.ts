import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupAllService } from 'src/app/group-all/group-all.service';


@Component({
  selector: 'app-groups',
  templateUrl: './group-all.component.html',
  providers: [ GroupAllService ],
  styleUrls: ['./group-all.component.scss']
})
export class GroupAllComponent implements OnInit {
  groups: Group;
  

  constructor(private groupsService: GroupAllService) { 

  }

  ngOnInit() {
    this.getAllGroups();
  }
  
  getAllGroups(): void {
    this.groupsService.getAllGroups()
    .subscribe(groups => {
      this.groups = groups;
    })
  }

}
