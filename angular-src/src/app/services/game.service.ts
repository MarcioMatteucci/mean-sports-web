
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment';
import { IGame } from '../models/game.model';

@Injectable()
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  getGames(query: string): Observable<IGame[]> {
    return this.http.get<IGame[]>(environment.apiUrl + 'games?c=' + query);
  }

  getGameById(id: string) {
    return this.http.get(environment.apiUrl + 'games/' + id);
  }

  createGame(game: any): Observable<IGame> {
    return this.http.post<IGame>(environment.apiUrl + 'games/', game);
  }

  deleteGame(id: string): any {
    return this.http.delete(environment.apiUrl + 'games/' + id);
  }

  initGame(id: string): any {
    return this.http.post(environment.apiUrl + 'games/' + id + '/start', null);
  }

  finishGame(id: string): any {
    return this.http.post(environment.apiUrl + 'games/' + id + '/finish', null);
  }

  // :id/events
  getEventsByGame(id: string): any {
    return this.http.get(environment.apiUrl + 'games/' + id + '/events');
  }

  // /:id/events/:idEvent
  deleteEvent(gameId: string, eventId: string) {
    return this.http.delete(environment.apiUrl + 'games/' + gameId + '/events/' + eventId);
  }

  addEvent(gameId: string, event: any) {
    return this.http.post(environment.apiUrl + 'games/' + gameId + '/events', event);
  }

}
