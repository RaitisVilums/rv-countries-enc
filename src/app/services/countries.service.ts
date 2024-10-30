import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  CountriesSchema,
  Country,
  CountryDetails,
  CountryDetailsSchema,
  CountryPopulationRankSchema,
} from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  http: HttpClient = inject(HttpClient);
  error = new Subject<HttpErrorResponse>();

  private getCountriesUrl =
    'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3';
  private getCountryByCodeUrl = 'https://restcountries.com/v3.1/alpha/';
  private getCountryByTranslationUrl =
    'https://restcountries.com/v3.1/translation/';
  private getCountryByLanguageUrl = 'https://restcountries.com/v3.1/lang/';
  private getCountryPopulationRankUrl = `https://restcountries.com/v3.1/all?fields=name,population`;

  GetCountries() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Country[]>(this.getCountriesUrl, { headers }).pipe(
      map((response) => {
        return response.map((country, index) => ({ ...country, id: index }));
      }),
      catchError((err: HttpErrorResponse) => {
        const errorObj: any = {
          statusCode: err.status,
          errorMessage: err.message,
          datetime: new Date(),
        };
        this.error.next(errorObj);
        return throwError(() => err);
      })
    );
  }

  GetCountryByCode(code: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = this.getCountryByCodeUrl + code;
    return this.http
      .get<CountryDetails[]>(url, {
        headers,
      })
      .pipe(
        map((response: CountryDetails[]) => {
          const result = CountryDetailsSchema.safeParse(response[0]);
          return result.success ? result.data : [];
        }),
        catchError((err: HttpErrorResponse) => {
          const errorObj: any = {
            statusCode: err.status,
            errorMessage: err.message,
            datetime: new Date(),
          };
          this.error.next(errorObj);
          return throwError(() => err);
        })
      );
  }

  GetCountryByTranslation(translation: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = this.getCountryByTranslationUrl + translation;

    return this.http.get<Country[]>(url, { headers }).pipe(
      map((response) => {
        return response.length ? response : [];
      }),
      catchError((err: HttpErrorResponse) => {
        const errorObj: any = {
          statusCode: err.status,
          errorMessage: err.message,
          datetime: new Date(),
        };
        this.error.next(errorObj);
        return throwError(() => err);
      })
    );
  }

  GetCountryByLanguage(lang: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = this.getCountryByLanguageUrl + lang.toLocaleLowerCase();

    return this.http.get<Country[]>(url, { headers }).pipe(
      map((response) => {
        return response.map((country, index) => ({ ...country, id: index }));
      }),
      catchError((err: HttpErrorResponse) => {
        const errorObj: any = {
          statusCode: err.status,
          errorMessage: err.message,
          datetime: new Date(),
        };
        this.error.next(errorObj);
        return throwError(() => err);
      })
    );
  }

  GetCountryPopulationRank() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = this.getCountryPopulationRankUrl;

    return this.http.get<Country[]>(url, { headers }).pipe(
      map((response) => {
        const result = CountryPopulationRankSchema.safeParse(
          response
            .sort((a, b) => b.population - a.population)
            .map((country, index) => ({
              ...country,
              populationRank: index + 1,
            }))
        );

        return result.success ? result.data : [];
      }),
      catchError((err: HttpErrorResponse) => {
        const errorObj: any = {
          statusCode: err.status,
          errorMessage: err.message,
          datetime: new Date(),
        };
        this.error.next(errorObj);
        return throwError(() => err);
      })
    );
  }
}
