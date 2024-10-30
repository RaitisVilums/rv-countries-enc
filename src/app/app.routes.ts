import { Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { HomeComponent } from './home/home.component';
import { CountryListComponent } from './country-list/country-list.component';
import { FavListComponent } from './fav-list/fav-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'country/:code',
    component: CountryComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'country-list/:code/:lang',
    component: CountryListComponent,
  },
  { path: 'favorites', component: FavListComponent },
];
