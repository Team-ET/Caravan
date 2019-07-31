import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, NavigationStart } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupsService } from '../groups/services/groups.service';
import { UserService } from '../main/user.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
  providers: [GroupsService]
})
export class GroupFormComponent implements OnInit {
  profile: any;
  groupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    destination: new FormControl(''),
    date_start: new FormControl('', Validators.required),
    date_end: new FormControl('', Validators.required),
  });
  picture: string;
  destination: string;


  constructor(
    private groupService: GroupsService,
    public activatedRoute: ActivatedRoute,
    private userService: UserService) {
   }

  ngOnInit(): void {
    this.profile = this.userService.getUser();
  }

  onSubmit() {
    const { name, date_end, date_start, destination } = this.groupForm.value;
    let formValues;
    if (this.destination) {
      formValues = {
        name,
        date_start,
        date_end,
        picture: this.picture,
        destination: this.destination
      };
    } else {
      formValues = {
        name,
        date_start,
        date_end,
        destination
      };
    }
    this.groupService.createGroup(formValues, this.profile.sub); // call create group method passing in the form values and user sub (unique id)
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
      // console.log(place.formatted_address);
      // console.log(this.picture);
      
    });
  }

}
