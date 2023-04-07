import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '../services/trips.service';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent implements OnInit {

  constructor(
    private router: Router,
    private tripsService: TripsService,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
      this.tripsService.deleteTrip(this.activatedRoute.snapshot.params['tripCode'])
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: e => console.log(e)
      });
  }
}
