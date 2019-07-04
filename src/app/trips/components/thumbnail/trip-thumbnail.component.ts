import { Component, OnInit } from '@angular/core';
import { Trip } from '../../../models/trip';
import { TripsService } from '../../services/trips.service';
import { mockTrip } from '../../services/mock-trip';

@Component({
  selector: 'app-trip-thumbnail',
  templateUrl: './trip-thumbnail.component.html',
  providers: [ TripsService ],
  styleUrls: ['./trip-thumbnail.component.scss']
})
export class TripThumbnailComponent implements OnInit {
  trips: Trip[];
  sub: string;

  constructor(private TripsService: TripsService) { }

  ngOnInit() {
    this.getTripMatches();
    this.getUserTrips(this.sub);
  }

  getTripMatches(): void {
    this.TripsService.getTripMatches()
      .subscribe(trips => {
        // console.log('getting groups', groups);
        this.trips = trips;
  })
}

  getUserTrips(sub): void {
    this.TripsService.getUserTrips()
      .subscribe(trips => {
        console.log('getting trips', trips);
        this.trips = trips;
      })
  }
}