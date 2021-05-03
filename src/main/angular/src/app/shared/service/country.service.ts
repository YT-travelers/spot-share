import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICountry } from 'src/app/shared/model/country';

@Injectable({ providedIn: 'root' })
export class CountryService {

  private url = 'api/countries';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  /**
   * 国検索処理
   */
  searchCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(this.url);
  }
}
