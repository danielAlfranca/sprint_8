import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ship } from 'src/app/interfaces/api';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ship!:Ship
  constructor(private activatedRoute:ActivatedRoute, private data:DataService) {

     this.activatedRoute.paramMap.subscribe(params => this.ship = this.data.getShip(Number(params.get('id'))));
   }

  ngOnInit(): void {


  }

}
