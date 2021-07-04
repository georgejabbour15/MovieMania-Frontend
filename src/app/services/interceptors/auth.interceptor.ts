import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RefreshTokenRequest } from "../../models/requests";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Injectable({ providedIn: 'root' })

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.token;
        const refreshToken = this.authService.refreshToken;
        return next.handle(this.addAuthenticationToken(req)).pipe(catchError(err => {
            //If the request is refresh token of login, throw the same error withtout altering it
            if (req.url.includes("refresh-token") || req.url.includes("login")) {
                //If the request is a refresh token request, logout, redirect to login page
                if (req.url.includes("refresh-token"))
                    this.authService.logout();
                return throwError(err);
            }

            if (err.status !== 401) {
                return throwError(err);
            }

            if (this.refreshTokenInProgress) {
                //Wait until the subject is not null to process the request
                return this.refreshTokenSubject.pipe(filter(result => result !== null), take(1), switchMap(() => {
                    return next.handle(this.addAuthenticationToken(req));
                }))
            }
            else {
                //Set refreshTokenInProgress to true, next the null to block other requests
                this.refreshTokenInProgress = true;
                this.refreshTokenSubject.next(null);
                return this.authService.refreshAuthToken(this.getRefreshTokenRequest(token, refreshToken)).pipe(
                    catchError(err => {
                        this.refreshTokenInProgress = false;
                        this.authService.logout();
                        return throwError(err);
                    }),
                    switchMap((token: any) => {
                        this.endRefreshToken(token);
                        return next.handle(this.addAuthenticationToken(req));
                    })
                );
            }
        }));
    }


    private getRefreshTokenRequest(token: string, refreshToken: string) {
        const request = <RefreshTokenRequest>{ token: token, refreshToken: refreshToken };
        return request;
    }

    private endRefreshToken(token: any) {
        //Set refreshTokenInProgress to false, next the token to unblock other requests
        this.refreshTokenInProgress = false;
        this.refreshTokenSubject.next(token);
    }


    private addAuthenticationToken(request: HttpRequest<any>) {
        const accessToken = this.authService.token;
        return !accessToken ? request : request.clone({ setHeaders: { 'Authorization': 'bearer ' + accessToken } });
    }


}
