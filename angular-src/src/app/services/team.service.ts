import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TeamService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTeams(): Observable<any> {
    return this.http.get('http://localhost:3000/api/teams');
  }

  getTeamByName(name: string) {
    return this.http.get('http://localhost:3000/api/teams?name=' + name);
  }

  createTeam(team: any) {
    return this.http.post('http://localhost:3000/api/teams', team);
  }

  deleteTeam(id: string) {
    return this.http.delete('http://localhost:3000/api/teams/' + id);
  }

}
