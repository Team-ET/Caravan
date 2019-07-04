import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupsService } from '../../services/groups.service';


@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
  providers: [GroupsService]
})
export class GroupFormComponent implements OnInit {
  groupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    date_start: new FormControl('', Validators.required),
    date_end: new FormControl('', Validators.required),
  });

  constructor(private groupService: GroupsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.groupService.createGroup(this.groupForm.value); // call create group method passing in the form values
    }
  onOpen(event: any) {
    console.log(event);
  }

  getPlaces() {
    let input = <HTMLInputElement>document.getElementById('searchBar');
    let autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function() {
      let place = autocomplete.getPlace();
      console.log(place.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500}));
      console.log(place);
    })
  }
}