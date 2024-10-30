import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { Country } from '../models/country.model';
import { CountriesService } from '../services/countries.service';
import { CountryCardComponent } from '../components/country-card.component';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    RouterModule,
    CountryCardComponent,
  ],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
})
export class CountryListComponent implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  countries: Country[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  countriesService: CountriesService = inject(CountriesService);
  route: ActivatedRoute = inject(ActivatedRoute);
  code: string | null = this.route.snapshot.paramMap.get('code');
  lang: string | null = this.route.snapshot.paramMap.get('lang');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const lang = params.get('lang');
      this.fetchCountries(lang);
    });
  }

  fetchCountries(lang: string | null) {
    if (lang) {
      this.isLoading = true;
      this.errorMessage = null;
      this.countriesService.GetCountryByLanguage(lang).subscribe({
        next: (countries) => {
          console.log(countries);
          this.countries = countries;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = `Error: ${err.message}. Please try again.`;
          this.isLoading = false;
        },
      });
    }
  }
}
