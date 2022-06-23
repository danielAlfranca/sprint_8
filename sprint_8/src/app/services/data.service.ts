import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { APIResponse, Ship } from '../interfaces/api';

@Injectable()
export class DataService {

  query$!:Observable<Ship[]>;
  ships:Ship[] = [];

  url = 'https://swapi.dev/api/starships';

  constructor(private httpClient:HttpClient) {

    this.query$ = this.httpClient
          .get<APIResponse>(this.url)
          .pipe(map(data=>{

              if(!this.url) return this.ships;
             
              this.ships = this.ships.concat(data.results || []);
              this.url = data.next || '';  /* NUEVA URL PARA EL INTERCEPTOR REQUEST ApiCallInterceptor */         
         
              return this.ships;

          }));

  }

  getShip(index:number){

    return this.ships[index]; 
  }
                  
}
