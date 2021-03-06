import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0.variables';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  private _scopes: string;

  userProfile: any;
  requestedScopes: string = "openid profile read:messages write:messages";

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.callbackURL,
    audience: AUTH_CONFIG.apiUrl,
    scope: this.requestedScopes
  });

  constructor(public router: Router) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public getAuthState() {
    return this.auth0.isAuthenticated();
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
        this.router.navigate(['/main']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private localLogin(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }
//
  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;

    this.auth0.logout({
      returnTo: window.location.origin
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return this._accessToken && Date.now() < this._expiresAt;
  }

  public getProfile(cb): void {
    if (!this._accessToken) {
      throw new Error("Access token must exist to fetch profile");
    }

    const self = this;
    this.auth0.client.userInfo(this._accessToken, (err, profile) => {
      console.log(profile);
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  public returnProfile(): void {
    return this.userProfile;
  }

  // public 

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(this._scopes).split(" ");
    return scopes.every(scope => grantedScopes.includes(scope));
  }

}
