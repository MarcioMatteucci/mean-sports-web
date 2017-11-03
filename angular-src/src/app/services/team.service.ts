import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TeamService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTeams() {
    return this.http.get('http://localhost:3000/api/teams');
  }

}
