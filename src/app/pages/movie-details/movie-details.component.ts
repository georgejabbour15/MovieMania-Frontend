import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RatedMovie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { RatingsService } from '../../services/ratings.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private movieService: MoviesService, private ratingService: RatingsService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(paramMap => {
      this.movieService.getMovieById(paramMap.get('id')).toPromise().then(res => this.movie = res.data);
    })
  }
  movie: RatedMovie = null;
  ngOnInit(): void {
  }

  onRate(event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    const newValue = event.newValue;
    this.ratingService.rateMovie(this.movie.id, newValue).toPromise().then(() => this.router.navigate(['/my-movies']))
  }

}
