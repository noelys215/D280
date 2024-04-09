import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorldBankService {
  private url = 'https://api.worldbank.org/v2/country/';

  constructor(private http: HttpClient) {}

  getCountryData(ID: string): Observable<any> {
    return this.http.get<any[]>(`${this.url}${ID}?format=json`);
  }
}
