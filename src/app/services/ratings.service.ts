import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RATING_ENDPOINTS } from '../../environments/api_endpoints';
import { environment } from '../../environments/environment';
import { GetRatedMoviesResponse } from '../models/responses';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http: HttpClient) { }

  public getUserMovies() {
    const ep = `${environment.API_URL}${RATING_ENDPOINTS.GET_USER_MOVIES}`
    return this.http.get<GetRatedMoviesResponse>(ep);
  }

  public rateMovie(movieId, rating) {
    const ep = `${environment.API_URL}${RATING_ENDPOINTS.RATE_MOVIE}`.replace('movieId', movieId)
    return this.http.post<any>(ep, rating);
  }

  public deleteRating(id: string) {
    const ep = `${environment.API_URL}${RATING_ENDPOINTS.DELETE_RATING}`.replace('movieId', id)
    return this.http.delete<any>(ep);
  }
}
