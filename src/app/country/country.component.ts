import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../services/countries.service';
import { CountryFormated, CountryDetails } from '../models/country.model';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { FavoritesCheckboxComponent } from '../components/favorites-checkbox.component';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    RouterModule,
    FavoritesCheckboxComponent,
  ],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  country?: CountryFormated | null;
  isLoading = false;
  errorMessage: string | null = null;
  countriesService: CountriesService = inject(CountriesService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const code = params.get('code');
      this.fetchCountry(code);
    });
  }

  fetchCountry(code: string | null) {
    if (code) {
      this.isLoading = true;
      this.errorMessage = null;
      this.countriesService.GetCountryByCode(code).subscribe({
        next: (country) => {
          const formattedData = this.formatCountryData(country as any);
          this.fetchCountriesPopulationRank(formattedData.name);
          this.country = formattedData;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = `Error: ${err.message}. Please try again.`;
          this.isLoading = false;
        },
      });
    } else {
      this.errorMessage = 'Invalid country code';
    }
  }

  fetchCountriesPopulationRank(name: string | null) {
    if (name) {
      this.countriesService.GetCountryPopulationRank().subscribe({
        next: (countries) => {
          const country = countries?.find((c) => c.name.common === name);
          if (country && this.country) {
            this.country.populationRank = country.populationRank;
          } else if (this.country) {
            this.country.populationRank = 0;
          }
        },
        error: (err) => {
          console.error(err);
          if (this.country) {
            this.country.populationRank = 0;
          }
        },
      });
    } else {
      if (this.country) {
        this.country.populationRank = 0;
      }
    }
  }

  formatCountryData(country: CountryDetails): CountryFormated {
    return {
      name: country.name.common,
      countryCode: country.cca3,
      population: country.population,
      flag: country.flags.svg,
      area: country.area,
      capital: country.capital,
      official: country.name.official,
      languages: country.languages
        ? Object.entries(country.languages).map(([code, name]) => ({
            code,
            name,
          }))
        : [],
      borders: country?.borders || [],
      cca3: country.cca3,
      populationRank: undefined,
    };
  }
}
