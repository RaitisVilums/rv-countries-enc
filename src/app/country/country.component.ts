import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../services/countries.service';
import { CountryFormated, CountryDetails } from '../models/country.model';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  country?: CountryFormated | null;
  isLoading = false;
  errorMessage: string | null = null;
  countriesService: CountriesService = inject(CountriesService);
  route: ActivatedRoute = inject(ActivatedRoute);

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

  formatCountryData(country: CountryDetails): CountryFormated {
    return {
      name: country.name.common,
      countryCode: country.cca3,
      population: country.population,
      flag: country.flags.svg,
      area: country.area,
      capital: country.capital,
      nativeName: country.name.nativeName
        ? Object.values(country.name.nativeName)[0].common
        : country.name.common,
      languages: country.languages
        ? Object.entries(country.languages).map(([code, name]) => ({
            code,
            name,
          }))
        : [],
      borders: country?.borders || [],
      cca3: country.cca3,
    };
  }

  goBack() {
    window.history.back();
  }
}
