import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, OnDestroy {
  country: any;
  countryCode: any;
  private apiUrl = 'https://restcountries.com/v3.1/alpha/';
  nativeName: any;
  currencyNames: any;
  languageNames: any;
  borderCountries: any[] = [];
  allCountries: any[] = [];
  private routeSub: Subscription;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.routeSub = new Subscription();
  }

  ngOnInit(): void {
    // Subscribe to route parameters
    this.routeSub = this.route.params.subscribe((params) => {
      this.countryCode = params['code'];
      this.fetchCountryDetails(this.countryCode);
    });

    // Fetch all countries if not already fetched
    if (this.allCountries.length === 0) {
      this.fetchAllCountries();
    }
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  fetchCountryDetails(code: any) {
    // Reset properties
    this.country = null;
    this.nativeName = '';
    this.currencyNames = '';
    this.languageNames = '';
    this.borderCountries = [];

    const url = `${this.apiUrl}${code}`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.country = data[0];
          this.processCountryData();
        } else {
          console.error('No country data found for code:', code);
        }
      },
      (error) => {
        console.error('Error fetching country:', error);
      }
    );
  }

  fetchAllCountries() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(
      (data) => {
        this.allCountries = data;
        this.getBorderCountries();
      },
      (error) => {
        console.error('Error fetching all countries:', error);
      }
    );
  }

  processCountryData() {
    this.nativeName = this.getNativeName();
    this.currencyNames = this.getCurrencyNames();
    this.languageNames = this.getLanguageNames();
    this.getBorderCountries();
  }

  getNativeName(): any {
    const nativeNames = this.country.name.nativeName;
    if (nativeNames) {
      const firstNativeName: any = Object.values(nativeNames)[0];
      return firstNativeName.common;
    }
    return this.country.name.common;
  }

  getCurrencyNames(): any {
    const currencies = this.country.currencies;
    if (currencies) {
      return Object.values(currencies)
        .map((currency: any) => currency.name)
        .join(', ');
    }
    return 'N/A';
  }

  getLanguageNames(): any {
    const languages = this.country.languages;
    if (languages) {
      return Object.values(languages).join(', ');
    }
    return 'N/A';
  }

  getBorderCountries() {
    if (this.country && this.country.borders && this.allCountries.length) {
      this.borderCountries = this.allCountries.filter((c) =>
        this.country.borders.includes(c.cca3)
      );
    } else if (!this.country.borders) {
      this.borderCountries = [];
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
