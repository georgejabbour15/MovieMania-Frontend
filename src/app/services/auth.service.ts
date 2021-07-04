import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_ENDPOINTS } from '../../environments/api_endpoints';
import { environment } from '../../environments/environment';
import { LoginRequest, RefreshTokenRequest, SignupRequest } from '../models/requests';
import { AuthResponse } from '../models/responses';
import { IUser } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public token: string;
  public refreshToken: string;
  public user: IUser = null;

  public userSubject: BehaviorSubject<IUser> = new BehaviorSubject(this.user);

  public login(request: LoginRequest) {
    const ep = `${environment.API_URL}${AUTH_ENDPOINTS.LOGIN}`;
    return this.http.post<{ data: AuthResponse }>(ep, request).pipe(tap(response => {
      this.processAuthResponse(response.data);
    }));
  }

  public signup(request: SignupRequest) {
    const ep = `${environment.API_URL}${AUTH_ENDPOINTS.SIGNUP}`;
    return this.http.post<any>(ep, request);
  }

  public logout() {
    const ep = `${environment.API_URL}${AUTH_ENDPOINTS.LOGOUT}`;
    return this.http.get(ep).toPromise().then(() => {
      this.token = null;
      this.refreshToken = null;
      this.user = null;
      this.router.navigate(['/login'])
    });
  }


  public refreshAuthToken(request: RefreshTokenRequest) {
    const ep = `${environment.API_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`;
    return this.http.post<{ data: AuthResponse }>(ep, request).pipe(tap(response => {
      this.processAuthResponse(response.data);
    }));
  }

  private processAuthResponse(response: AuthResponse) {
    this.token = response.token;
    this.refreshToken = response.refreshToken;
    this.user = response.user;
    this.userSubject.next(this.user);
  }
}


