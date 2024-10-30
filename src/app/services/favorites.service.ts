import { inject, Injectable } from '@angular/core';
import { Country } from '../models/country.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private LOCAL_STORAGE_KEY = 'FAV_LIST';
  private countries: Country[] = [];
  private router = inject(Router);

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites() {
    const favoritesJson = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (favoritesJson) {
      this.countries = JSON.parse(favoritesJson);
    }
  }

  private saveFavorites() {
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(this.countries)
    );
  }

  getFavorites(): Country[] {
    return [...this.countries];
  }

  isFavorite(country: Country): boolean {
    return this.countries.some((favorite) => favorite.cca3 === country.cca3);
  }

  addFavorite(country: Country) {
    if (!this.isFavorite(country)) {
      this.countries.push(country);
      this.saveFavorites();
    }
  }

  removeFavorite(country: Country) {
    this.countries = this.countries.filter(
      (favorite) => favorite.cca3 !== country.cca3
    );
    this.reloadPage();
    this.saveFavorites();
  }

  reloadPage() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
