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
    // destination: new FormControl('', Validators.required),
    date_start: new FormControl('', Validators.required),
    date_end: new FormControl('', Validators.required),
  });
  picture: string;
  destination: string;


  constructor(private groupService: GroupsService) {
   }

  ngOnInit(): void {
  }

  onSubmit() {
    const { name, date_end, date_start } = this.groupForm.value;
    const formValues = {
      name,
      date_start,
      date_end,
      picture: this.picture,
      destination: this.destination
    }
    this.groupService.createGroup(formValues); // call create group method passing in the form values
    }

  onOpen(event: any) {
    console.log(event);
  }

  getPlaces() {
    const input = <HTMLInputElement>document.getElementById('searchBar');
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.picture = place.photos[0].getUrl({maxWidth: 500, maxHeight: 500});
      this.destination = place.formatted_address;
    });
  }
}
