import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country, CountryDetails } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  http: HttpClient = inject(HttpClient);
  error = new Subject<HttpErrorResponse>();
  private getCountriesUrl =
    'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca2';

  GetCountries() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

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
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .get<CountryDetails>(`https://restcountries.com/v3.1/alpha/${code}`, {
        headers,
      })
      .pipe(
        map((response: any) => {
          return response[0];
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
    console.log(translation);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `https://restcountries.com/v3.1/translation/${translation}`;

    return this.http.get<Country[]>(url, { headers }).pipe(
      map((response) => {
        return response.length ? response : null;
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
