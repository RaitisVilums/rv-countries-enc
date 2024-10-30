import { Component, inject, OnInit } from '@angular/core';
import { MOCK_DATA } from '../mock';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { LucideAngularModule, Search } from 'lucide-angular';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly Search = Search;
  countries = [];
  isLoading = false;
  http: HttpClient = inject(HttpClient);
  countriesService: CountriesService = inject(CountriesService);

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries() {
    this.isLoading = true;
    this.countriesService.GetCountries().subscribe({
      next: (country) => {
        this.countries = country;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
