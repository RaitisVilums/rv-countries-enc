import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LucideAngularModule, Search, XCircleIcon } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CountriesService } from '../services/countries.service';
import { Country } from '../models/country.model';
import { CountryCardComponent } from '../components/country-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    RouterModule,
    FormsModule,
    CountryCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly Search = Search;
  readonly XCircleIcon = XCircleIcon;
  countries: Country[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  searchQuery = '';
  countriesService: CountriesService = inject(CountriesService);

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries() {
    this.isLoading = true;
    this.errorMessage = null;
    this.countriesService.GetCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = `${err}. Please try again.`;
        this.isLoading = false;
      },
    });
  }

  searchCountry() {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      this.errorMessage = null;
      this.countriesService
        .GetCountryByTranslation(this.searchQuery)
        .subscribe({
          next: (country) => {
            this.countries = country;
            this.isLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            this.errorMessage = `${err.message}. Please try again.`;
            this.isLoading = false;
          },
        });
    } else {
      this.fetchCountries();
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchCountry();
  }
}
