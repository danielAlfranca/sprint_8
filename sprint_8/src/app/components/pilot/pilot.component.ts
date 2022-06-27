import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: '[app-pilot]',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.scss']
})
export class PilotComponent implements OnInit, OnDestroy {

  @Input() url!:string;

  pilot!:any;

  private subscription!:Subscription

  constructor(private data:DataService) { }

  ngOnInit(): void {

    this.subscription = this.data.getPilot(this.url).subscribe(e=>{

      this.pilot = e;

    });
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() }

}
