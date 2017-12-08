import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  getAllGames() {
    return this.http.get('http://localhost:3000/api/games');
  }

  getGameById(gameId: string) {
    return this.http.get('http://localhost:3000/api/games/' + gameId);
  }

}
