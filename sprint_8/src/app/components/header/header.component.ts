import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  isInit = true;
  user = "";

  constructor(private route: Router, private loginService: LoginService){ 

    this.route.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event=>{

        const url = (event as NavigationEnd).url || '';
        this.isInit= url.includes('welcome') && url.includes('init=true');

      });

      this.loginService.update.subscribe(e=>this.user = e);
  }

  unlog(){ this.loginService.log(''); }

}
