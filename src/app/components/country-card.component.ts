import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./country-card.component.scss'],
  template: `
    <li class="card">
      <a [routerLink]="['/country', country.cca3]">
        <img [src]="country.flags.svg" alt="{{ country.name.common }} Flag" />
        <div class="card__data">
          <h3>{{ country.name.common }}</h3>
          <p>Population: {{ country.population | number }}</p>
          <p>Region: {{ country.region }}</p>
          <p>Capital: {{ country.capital ? country.capital[0] : 'N/A' }}</p>
        </div>
      </a>
    </li>
  `,
  styles: [],
})
export class CountryCardComponent {
  @Input() country!: Country;
}
