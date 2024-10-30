import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { FavoritesService } from '../services/favorites.service';
import { Country } from '../models/country.model';
import { RouterModule } from '@angular/router';
import { CountryCardComponent } from '../components/country-card.component';

@Component({
  selector: 'app-fav-list',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    RouterModule,
    CountryCardComponent,
  ],
  templateUrl: './fav-list.component.html',
  styleUrl: './fav-list.component.scss',
})
export class FavListComponent {
  readonly ArrowLeft = ArrowLeft;
  favorites: Country[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  favService = inject(FavoritesService);

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    try {
      this.isLoading = true;
      this.favorites = this.favService.getFavorites();
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = 'Failed to load favorites.';
      this.isLoading = false;
    }
  }
}
