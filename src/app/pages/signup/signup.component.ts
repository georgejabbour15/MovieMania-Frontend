import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupRequest } from '../../models/requests';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignupSubmit(signupForm: NgForm) {

    const request = <SignupRequest>{
      email: signupForm.value.email,
      password: signupForm.value.password,
      firstName: signupForm.value.firstName,
      lastName: signupForm.value.firstName
    };

    this.authService.signup(request).toPromise().then(() => { this.router.navigate(['/login']) })
  }
}
