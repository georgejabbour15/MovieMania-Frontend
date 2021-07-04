import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Country } from '../../models/country';
import { Genre } from '../../models/genre';
import { IMovie } from '../../models/movie';
import { GetFilteredMoviesRequest } from '../../models/requests';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private movieService: MoviesService, private route: ActivatedRoute) { }

  selectedGenres: string[] = []
  selectedCountries: string[] = []

  countries: Country[] = [];
  genres: Genre[] = [];
  movies: IMovie[] = [];

  private searchString = null;
  private refresh: boolean = true;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchString = params['search'];
        this.movies = []
        this.movieService.searchMovies(params['search']).toPromise().then(res => {
          res.data.forEach(m => this.movies.push(<IMovie>m))
        });
      } else {
        this.movieService.getAllMovies(this.movies.length, 50).toPromise().then(res => {
          res.data.forEach(m => this.movies.push(<IMovie>m))
        });
      }
    })
    this.movieService.getGenres().toPromise().then(res => { this.genres = res.data });
    this.movieService.getCountries().toPromise().then(res => { this.countries = res.data });
  }


  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if (!this.searchString && this.selectedGenres.length == 0 && this.selectedCountries.length == 0) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      if (pos >= (max + 70 * max / 100) && this.refresh) {
        this.refresh = false;
        this.movieService.getAllMovies(this.movies.length, 50).toPromise().then(res => {
          res.data.forEach(m => this.movies.push(<IMovie>m))
          this.refresh = true;
        });
      }
    }
  }

  toggleGenre(id) {
    if (this.selectedGenres.includes(id))
      this.selectedGenres = this.selectedGenres.filter(x => x != id)
    else this.selectedGenres.push(id)
    this.getMovies();
  }

  toggleCountry(id) {
    if (this.selectedCountries.includes(id))
      this.selectedCountries = this.selectedCountries.filter(x => x != id)
    else this.selectedCountries.push(id)
    this.getMovies();
  }

  private getMovies() {
    if (this.selectedGenres.length != 0 || this.selectedCountries.length != 0) {
      const req = <GetFilteredMoviesRequest>{
        countries: this.selectedCountries.length != 0 ? this.selectedCountries : [],
        genres: this.selectedGenres.length != 0 ? this.selectedGenres : []
      }
      this.movieService.getFilteredMovies(req).toPromise().then(res => {
        this.movies = []
        res.data.forEach(m => this.movies.push(<IMovie>m))
      });
    }
    else {
      this.movies = []
      this.movieService.getAllMovies(this.movies.length, 50).toPromise().then(res => {
        res.data.forEach(m => this.movies.push(<IMovie>m))
      });
    }
  }
}
