import { Component, OnInit } from '@angular/core';

import { GameService } from './../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  result: any;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.gameService.getAllGames()
      .subscribe(data => {
        this.result = data;
        console.log(this.result);
      });
  }

}
