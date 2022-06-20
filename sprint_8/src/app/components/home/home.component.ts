import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ship } from 'src/app/interfaces/api';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscription!: Subscription;
  ships!: Observable<Ship[]>;


  constructor(private data:DataService) { }

  ngOnInit(): void {

    this.ships = this.data.query$;
    this.subscription = this.data.query$.subscribe()
  }

}
