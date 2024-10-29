import { Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'country',
    component: CountryComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
