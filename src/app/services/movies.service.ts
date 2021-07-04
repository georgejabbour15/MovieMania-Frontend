import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MOVIES_ENDPOINTS } from '../../environments/api_endpoints';
import { environment } from '../../environments/environment';
import { RatedMovie } from '../models/movie';
import { GetFilteredMoviesRequest } from '../models/requests';
import { GetCountriesResponse, GetGenresResponse, GetMoviesResponse } from '../models/responses';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  public getCountries() {
    const ep = `${environment.API_URL}${MOVIES_ENDPOINTS.GET_COUNTRIES}`
    return this.http.get<GetCountriesResponse>(ep);
  }

  public getGenres() {
    const ep = `${environment.API_URL}${MOVIES_ENDPOINTS.GET_GENRES}`
    return this.http.get<GetGenresResponse>(ep);
  }

  public getAllMovies(start: number, end: number) {
    const ep = `${environment.API_URL}${MOVIES_ENDPOINTS.GET_ALL_MOVIES}`
    return this.http.get<GetMoviesResponse>(ep, { params: { start: start, end: end } });
  }

  public getMovieById(id: string) {
    const ep = `${environment.API_URL}${MOVIES_ENDPOINTS.GET_MOVIE_BY_ID}`.replace('movieId', id)
    return this.http.get<{ data: RatedMovie }>(ep);
  }
  public searchMovies(searchString: string) {
    const ep = `${environment.API_URL}${MOVIES_ENDPOINTS.GET_MOVIE_BY_NAME}`
    return this.http.get<GetMoviesResponse>(ep, { params: { movieName: searchString } });
  }

  public getFilteredMovies(request: GetFilteredMoviesRequest) {
    const ep = `${environment.API_URL}${MOVIES_ENDPOINTS.GET_FILTERED_MOVIES}`
    return this.http.post<GetMoviesResponse>(ep, request);
  }
}
