import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from './../../services/game.service';
import { IGame } from './../../models/game.model';
import { IEvent } from './../../models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  id: string;
  game: IGame;
  localEvents: IEvent[] = [];
  visitingEvents: IEvent[] = [];

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) { }

  getIdGame() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  getGame() {
    this.gameService.getGameById(this.id)
      .subscribe((data: any) => {
        this.game = data.game;
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

  onFinishGame() {
    this.gameService.finishGame(this.id)
      .subscribe((data: any) => {
        this.router.navigate(['/games']);
      },
      (err: any) => {
        console.log(err.error.msg);
      });
  }

  onEventDelete(eventId) {
    this.gameService.deleteEvent(this.id, eventId)
      .subscribe((data: any) => {
        this.getEvents();
      },
      (err: any) => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.getIdGame();
    this.getGame();
    this.getEvents();
  }

}
