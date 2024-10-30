import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Country } from '../models/country.model';
import { FavoritesService } from '../services/favorites.service';
import { FavoritesCheckboxComponent } from './favorites-checkbox.component';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FavoritesCheckboxComponent],
  styleUrls: ['./country-card.component.scss'],
  template: `
    <li class="card">
      <a [routerLink]="['/country', country.cca3]">
        <img [src]="country.flags.svg" alt="{{ country.name.common }} Flag" />
        <div class="card__data">
          <h3>{{ country.name.common }}</h3>
          <p>Population: {{ country.population | number }}</p>
          <p>Region: {{ country.region }}</p>
          <p>
            Capital:
            {{ country.capital ? country.capital[0] : 'Not Mentioned' }}
          </p>
        </div>
      </a>
      <app-favorites-checkbox
        [country]="country"
        [uniqueId]="country.cca3"
      ></app-favorites-checkbox>
    </li>
  `,
  styles: [],
})
export class CountryCardComponent {
  @Input() country!: Country;
}
