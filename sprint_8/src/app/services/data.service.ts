import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIResponse, Ship } from '../interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  query$!:Observable<Ship[]>;
  constructor(private httpClient:HttpClient) {

    this.query$ = this.httpClient
          .get<APIResponse>('https://swapi.dev/api/starships')
          .pipe(map(data=>data.results));

  }
                  
}
