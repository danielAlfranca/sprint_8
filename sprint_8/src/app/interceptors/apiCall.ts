import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable} from 'rxjs';
import { DataService } from '../services/data.service';

/* https://angular.io/guide/http#intercepting-requests-and-responses */

@Injectable()
export class ApiCallInterceptor implements HttpInterceptor {
 
  constructor(private dataService:DataService){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      
      if(req.url.includes('starships')){

        const newReq = req.clone({url: this.dataService.url});     
    
        return next.handle(newReq);

      }

      return next.handle(req);
    
  }

}