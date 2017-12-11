import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


import { IGame } from '../models/game.model';

@Injectable()
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  getGames(query: string): Observable<IGame[]> {
    return this.http.get<IGame[]>('http://localhost:3000/api/games?c=' + query);
  }

  getGameById(gameId: string) {
    return this.http.get('http://localhost:3000/api/games/' + gameId);
  }

  createGame(game: any): Observable<IGame> {
    return this.http.post<IGame>('http://localhost:3000/api/games/', game);
  }

  deleteGame(id: string): any {
    return this.http.delete('http://localhost:3000/api/games/' + id);
  }

  initGame(id: string): any {
    return this.http.post('http://localhost:3000/api/games/' + id + '/start', null);
  }

}
