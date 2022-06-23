import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user = "";
  private logUpdate = new Subject();

  get update(){

    return this.logUpdate as Observable<any>
  }

  constructor() {}

  log(user:string){

    this.user = user;
    this.logUpdate.next(user);

  }
}
