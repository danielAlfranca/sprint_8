import { Component, HostListener, OnInit } from '@angular/core';
import { take } from 'rxjs';
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

  @HostListener('body:scroll', []) onScroll() {

    const isEnd = document.body.offsetHeight + document.body.scrollTop >= document.body.scrollHeight;

    if (isEnd) { this.getMoreShips() }
  } 

  constructor(private data:DataService) { }

  ngOnInit(): void { this.getMoreShips(); } 
  
  getMoreShips(){

    if(!this.gotToTheFinal){

      this.data.query$.pipe(take(1)).subscribe((data)=>{
      
        this.gotToTheFinal = this.ships.length == data.length;
  
        this.ships = data;
      
      });
    }    
  }
 

}