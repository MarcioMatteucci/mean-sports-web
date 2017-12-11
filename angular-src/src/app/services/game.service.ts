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

  getAllGames(): Observable<IGame[]> {
    return this.http.get<IGame[]>('http://localhost:3000/api/games');
  }

  getGameById(gameId: string) {
    return this.http.get('http://localhost:3000/api/games/' + gameId);
  }

}
