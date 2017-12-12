import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { ITeam } from './../models/team.model';
import { environment } from '../../environments/environment';

@Injectable()
export class TeamService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTeams(): Observable<ITeam[]> {
    return this.http.get<ITeam[]>(environment.apiUrl + 'teams');
  }

  getTeamByName(name: string): Observable<ITeam> {
    return this.http.get<ITeam>(environment.apiUrl + 'teams?name=' + name);
  }

  createTeam(team: any): Observable<ITeam> {
    return this.http.post<ITeam>(environment.apiUrl + 'teams', team);
  }

  deleteTeam(id: string): any {
    return this.http.delete(environment.apiUrl + 'teams/' + id);
  }

}
