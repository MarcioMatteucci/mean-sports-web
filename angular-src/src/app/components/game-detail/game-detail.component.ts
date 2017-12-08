import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from './../../services/game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  gameId;
  result: any;
  isLoading = true;
  isStarted: boolean;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      console.log(this.gameId);
    });

    this.gameService.getGameById(this.gameId)
      .subscribe(data => {
        this.result = data;
        console.log(this.result);
      }, (err: any) => {
        if (err.status === 404) {
          console.log('No se encontro game con ese ID');

        }
      });

    this.isLoading = false;
  }

}
