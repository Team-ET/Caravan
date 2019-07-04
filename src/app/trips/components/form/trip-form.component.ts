import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripsService } from '../../services/trips.service';


@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
  providers: [TripsService]
})
export class TripFormComponent implements OnInit {
  tripForm = new FormGroup({
    name: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    date_start: new FormControl('', Validators.required),
    date_end: new FormControl('', Validators.required),
  });

  constructor(private TripService: TripsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.TripService.createTrip(this.tripForm.value); // call create Trip method passing in the form values
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