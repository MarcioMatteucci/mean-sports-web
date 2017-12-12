import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from './../../services/game.service';
import { IGame } from './../../models/game.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  id: string;
  game: IGame;
  localEvents: any;
  visitingEvents: any;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) { }

  getIdGame() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  getGame() {
    this.gameService.getGameById(this.id)
      .subscribe((data: any) => {
        this.game = data;
        console.log(this.game);
      }, (err: any) => {
        if (err.status === 404) {
          console.log('No se encontro game con ese ID');
        }
      }
      );

  }

  getEvents() {
    this.gameService.getEventsByGame(this.id)
      .subscribe((data: any) => {
        if (data.success) {
          this.localEvents = data.localEvents;
          this.visitingEvents = data.visitingEvents;
          console.log(this.localEvents);
          console.log(this.visitingEvents);
        }
      },
      (err: any) => {
        console.log(err.error.msg);
      });

  }

  ngOnInit() {
    this.getIdGame();
    this.getGame();
    this.getEvents();
  }

}
