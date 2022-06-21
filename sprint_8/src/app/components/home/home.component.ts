import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, take } from 'rxjs';
import { Ship } from 'src/app/interfaces/api';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ships = [] as Ship[];
  gotToTheFinal = false;

  constructor(private data:DataService) { }

  ngOnInit(): void { this.getMoreShips(); } 
  
  getMoreShips(){

    this.data.query$.pipe(take(1)).subscribe((data)=>{
      
      this.gotToTheFinal = this.ships.length == data.length;

      this.ships = data;
    
    });
  }
 

}