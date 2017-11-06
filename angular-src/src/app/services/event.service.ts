import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  getAllEvents() {
    return this.http.get('http://localhost:3000/api/events');
  }


}
