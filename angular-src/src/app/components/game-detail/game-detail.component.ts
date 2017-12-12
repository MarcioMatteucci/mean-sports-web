import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GameService } from './../../services/game.service';
import { IGame } from './../../models/game.model';
import { IEvent } from './../../models/event.model';

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

  isLoading = true;
  processing = false;

  newEvent: any;

  messageClass: string;
  showMessage = false;
  onSubmitMessage: string;

  isOwnGoal = false;

  targetTeam = 'local';

  eventForm: FormGroup;

  eventFormAvailable = false;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) { }

  createEventForm() {
    this.eventForm = new FormGroup({
      eventType: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change'
      }),
      isOwnGoal: new FormControl(false, {
        updateOn: 'change'
      }),
      player1: new FormControl('', {
        updateOn: 'change'
      }),
      player2: new FormControl('', {
        updateOn: 'change'
      })
    });
  }

  selectTargetTeam(team: string) {
    this.targetTeam = team;
  }

  disableForm() {
    this.eventForm.controls['eventType'].disable();
    this.eventForm.controls['isOwnGoal'].disable();
    this.eventForm.controls['player1'].disable();
    this.eventForm.controls['player2'].disable();
  }

  enableForm() {
    this.eventForm.controls['eventType'].enable();
    this.eventForm.controls['isOwnGoal'].enable();
    this.eventForm.controls['player1'].enable();
    this.eventForm.controls['player2'].enable();
  }

  toggleEventForm() {
    this.eventFormAvailable = !this.eventFormAvailable;
    this.cleanForm();
  }

  cleanForm() {
    this.eventForm.get('eventType').setValue('');
    this.eventForm.get('isOwnGoal').setValue(false);
    this.eventForm.get('player1').setValue('');
    this.eventForm.get('player2').setValue('');
    this.targetTeam = 'local';
  }

  onEventSubmit() {
    this.disableForm();
    this.processing = true;

    if (this.eventForm.get('eventType').value === 'Sustitución') {
      this.newEvent = {
        team: this.targetTeam,
        type: this.eventForm.get('eventType').value,
        player1: this.eventForm.get('player1').value,
        player2: this.eventForm.get('player2').value,
      };
    } else {
      this.newEvent = {
        team: this.targetTeam,
        type: this.eventForm.get('eventType').value,
        player1: this.eventForm.get('player1').value,
        isOwnGoal: this.eventForm.get('isOwnGoal').value,
      };
    }

    this.gameService.addEvent(this.id, this.newEvent)
      .subscribe((data: any) => {
        this.messageClass = 'alert alert-success';
        this.showMessage = true;
        this.onSubmitMessage = data.msg;
        this.getEvents();
        this.getGame();
        setTimeout(() => {
          this.showMessage = false;
          this.cleanForm();
          this.enableForm();
          this.processing = false;
        }, 2500);
      },
      (err: any) => {
        this.messageClass = 'alert alert-danger';
        this.showMessage = true;
        this.onSubmitMessage = err.error.msg;
        setTimeout(() => {
          this.showMessage = false;
          this.cleanForm();
          this.enableForm();
          this.processing = false;
        }, 2500);
      });
  }

  getIdGame() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  getGame() {
    this.gameService.getGameById(this.id)
      .subscribe((data: any) => {
        this.game = data.game;
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
        this.getGame();
      },
      (err: any) => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.createEventForm();
    this.getIdGame();
    this.getGame();
    this.getEvents();

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

  }

}
