import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class TripsService {
  
  private readonly API_BASE_URL = 'http://localhost:3000/api';
  private token?: String | null;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.authService.tokenSubject.subscribe(t => this.token = t);
  };

  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.API_BASE_URL}/trips`);
  }

  public addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.API_BASE_URL}/trips`, trip, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  public getTrip(code: String): Observable<Trip> {
    return this.http.get<Trip>(`${this.API_BASE_URL}/trips/${code}`);
  }

  public updateTrip(code: String, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.API_BASE_URL}/trips/${code}`, trip, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  public deleteTrip(code: String): Observable<Trip> {
    return this.http.delete<Trip>(`${this.API_BASE_URL}/trips/${code}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
}
