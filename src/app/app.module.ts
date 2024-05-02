import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentationComponent } from './documentation/documentation.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ProfileComponent } from './profile/profile.component';
import { DnevnikComponent } from './dnevnik/dnevnik.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersComponent } from './users/users.component';
import { NgxCaptchaModule  } from 'ngx-captcha';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from './enviroments/environment.prod';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'movieDetails/:id', component: MovieDetailsComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dnevnik', component: DnevnikComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    DocumentationComponent,
    MovieDetailsComponent,
    FavouritesComponent,
    ProfileComponent,
    DnevnikComponent,
    RegistrationComponent,
    UsersComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    RecaptchaModule,
    RecaptchaV3Module,
    RouterModule.forRoot(routes),
  ],
  providers: [ {provide: RECAPTCHA_V3_SITE_KEY,
    useValue: environment.siteKey,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
