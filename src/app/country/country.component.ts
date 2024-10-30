import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../services/countries.service';
import { CountryDetails } from '../models/country.model';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  country?: CountryDetails;
  isLoading = false;
  error: string | null = null;

  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchCountry();
  }

  fetchCountry() {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.isLoading = true;
      this.countriesService.GetCountryByCode(code).subscribe({
        next: (country) => {
          console.log(country);
          this.country = country;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to fetch country details';
          this.isLoading = false;
        },
      });
    } else {
      this.error = 'Invalid country code';
    }
  }

  goBack() {
    window.history.back();
  }
}
