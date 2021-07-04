import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/requests';
import { AuthService } from '../../services/auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onLoginSubmit(loginForm: NgForm) {
    const request = <LoginRequest>{ email: loginForm.value.email, password: loginForm.value.password };
    this.authService.login(request).toPromise().then(() => { this.router.navigate(['/home']) })
  }
}
