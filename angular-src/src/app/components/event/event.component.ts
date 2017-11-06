import { Component, OnInit } from '@angular/core';

import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  result: any;

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventService.getAllEvents()
      .subscribe(data => {
        this.result = data;
        console.log(this.result);
      });
  }

}
