import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }

  logout() {

    this.authService.logout()
  }

  searchMovies(searchForm: NgForm) {
    const searchString = searchForm.value.searchString
    this.router.navigate(['/home'], { queryParams: { 'search': searchString } });
  };

}
