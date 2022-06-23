import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ship!:any;
  shipData = ['model','manufacturer','cost_in_credits','length', 'max_atmosphering_speed','crew'];
  imgURL!:string
  constructor(private activatedRoute:ActivatedRoute, private router: Router, private data:DataService) {

     this.activatedRoute.paramMap.subscribe(params => {

        const id = Number(params.get('id')), ship = this.data.getShip(id);

        if(!ship) this.router.navigate(['/home']);

        else{
          
          this.ship = ship;

          let url:any= (ship as any).url,
              id = (url.split('/').filter((e:any)=>e).pop()).trim();

          this.imgURL = 'https://starwars-visualguide.com/assets/img/starships/'+ id + '.jpg';

        }

        console.log(ship)
    
    });
   }

  ngOnInit(): void {}

}
