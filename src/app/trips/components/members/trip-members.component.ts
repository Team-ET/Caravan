import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../../../models';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-trip-members',
  templateUrl: './trip-members.component.html',
  styleUrls: ['./trip-members.component.scss'],
  providers: [TripsService]
})
export class TripMembersComponent implements OnInit {
  @Input() tripId: number;

  members: Member[] = [];


  constructor(private tripService: TripsService) { }

  ngOnInit() {
    if (this.tripId) {
      this.loadMembers(this.tripId);
    }
  }

  loadMembers(tripId: number) {
    this.tripService.getTripMembers(tripId).subscribe(result => {
      this.members = result;
    });
  }

}
