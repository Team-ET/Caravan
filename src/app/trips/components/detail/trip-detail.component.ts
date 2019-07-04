import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from '../../../models';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
  providers: [TripsService]
})
export class TripDetailComponent implements OnInit {
  tripId: number;
  trip: Trip; // model

  constructor(readonly route: ActivatedRoute, private tripsService: TripsService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.tripId = params.tripId;
    this.getTripById(this.tripId);
    });
  }

  getTripById(id: number) {
    this.tripsService.getTrip(id).subscribe(result => {
      this.trip = result;
    });
  }

}
