import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { filter, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {

  user = "";
  private logUpdate = new Subject();

  get update(){

    return this.logUpdate as Observable<any>
  }

  constructor(private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {

    if(Boolean(this.user)) return true;

    return this.router.createUrlTree(['/login'],{queryParams:{mode:'sign-up'}});

  }

  log(user:string){

    this.user = user;
    this.logUpdate.next(user);

    if(!this.user) this.router.navigate(['/login', {queryParameters:{mode:'sign-up'}}])

  }
}
