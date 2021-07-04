import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { MovieDetailsComponent } from "./pages/movie-details/movie-details.component";
import { MyMoviesComponent } from "./pages/my-movies/my-movies.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { AuthGuard } from "./services/guards/auth.guard";
import { UnAuthGuard } from "./services/guards/un-auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [UnAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [UnAuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'my-movies', component: MyMoviesComponent, canActivate: [AuthGuard] },
  { path: 'movie/:id', component: MovieDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }