import { Component, OnInit } from '@angular/core';
import { IMovie, RatedMovie } from '../../models/movie';
import { RatingsService } from '../../services/ratings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss']
})
export class MyMoviesComponent implements OnInit {

  constructor(private ratingService: RatingsService) { }


  movies: RatedMovie[] = [];


  ngOnInit(): void {
    this.ratingService.getUserMovies().toPromise().then(res => {
      res.data.forEach(m => this.movies.push(<RatedMovie>m))
    });
  }

  deleteRating(id) {
    this.ratingService.deleteRating(id).toPromise().then(() => { this.movies = this.movies.filter(m => m.id != id) })
  }
}
