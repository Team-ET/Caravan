import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AUTH_CONFIG } from '../auth/auth0-variables';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

interface IApiResponse {
  message: string;
}

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})

export class PingComponent {

  // Security note: API uses https to avoid bearer token leakage
  API_URL: string = AUTH_CONFIG.apiUrl;
  message: string;

  constructor(public auth: AuthService, private http: HttpClient) {}

  public securedPing(): void {
    this.message = '';
    this.http
      .get<IApiResponse>(`${this.API_URL}/private`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
      })
      .subscribe(
        data => this.message = data.message,
        error => this.message = error
      );
  }

}
