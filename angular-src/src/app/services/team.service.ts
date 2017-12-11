import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { ITeam } from './../models/team.model';

@Injectable()
export class TeamService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTeams(): Observable<ITeam[]> {
    return this.http.get<ITeam[]>('http://localhost:3000/api/teams');
  }

  getTeamByName(name: string): Observable<ITeam> {
    return this.http.get<ITeam>('http://localhost:3000/api/teams?name=' + name);
  }

  createTeam(team: any): Observable<ITeam> {
    return this.http.post<ITeam>('http://localhost:3000/api/teams', team);
  }

  deleteTeam(id: string): any {
    return this.http.delete('http://localhost:3000/api/teams/' + id);
  }

}
