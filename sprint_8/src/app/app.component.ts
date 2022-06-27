import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { routerAnimation } from './app-routing.module';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[routerAnimation]
})
export class AppComponent {
  title = 'sprint_8';

  constructor(){}

  prepareRoute(o:RouterOutlet){

    return o.isActivated ? o.activatedRoute : '';
  }

  

  
}
