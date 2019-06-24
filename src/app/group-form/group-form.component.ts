import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupsService } from '../groups/services/groups.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
  providers: [GroupsService]
})
export class GroupFormComponent implements OnInit {
  groupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });

  constructor(private groupService: GroupsService) { }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.groupService.createGroup(this.groupForm.value);
    }

}
