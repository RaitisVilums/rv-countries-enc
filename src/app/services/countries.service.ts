import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  http: HttpClient = inject(HttpClient);
  error = new Subject<HttpErrorResponse>();
  getCountriesUrl =
    'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca2';

  GetCountries() {
    let headers = new HttpHeaders();
    headers = headers.append('content-type', 'application/json');
    headers = headers.append('content-type', 'text/html');
    return (
      this.http
        .get(this.getCountriesUrl, {
          headers: headers,
          observe: 'body',
        })
        .pipe((response) => {
          let countries = [];
          console.log(response);
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              countries.push({ ...response[key], id: key });
            }
          }

          return countries;
        }),
      catchError((err) => {
        const errorObj = {
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
