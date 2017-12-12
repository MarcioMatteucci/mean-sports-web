import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { GameService } from './../../services/game.service';
import { TeamService } from './../../services/team.service';
import { IGame } from './../../models/game.model';
import { ITeam } from '../../models/team.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  pendingGames: IGame[] = [];
  startedGames: IGame[] = [];
  finishedGames: IGame[] = [];
  gameFormAvailable = false;
  localTeams: string[] = [];
  visitingTeams: string[] = [];
  selectedLocalTeam: ITeam;
  selectedVisitingTeam: ITeam;
  processing = false;
  showMessage: boolean;
  messageClass: string;
  onSubmitMessage: string;

  gameForm: FormGroup;

  constructor(
    private gameService: GameService,
    private teamService: TeamService
  ) {
    this.createGameForm();
  }

  createGameForm() {
    this.gameForm = new FormGroup({
      localTeamName: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change'
      }),
      visitingTeamName: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change'
      })
    });
  }

  disableForm() {
    this.gameForm.controls['localTeamName'].disable();
    this.gameForm.controls['visitingTeamName'].disable();
  }

  enableForm() {
    this.gameForm.controls['localTeamName'].enable();
    this.gameForm.controls['visitingTeamName'].enable();
  }

  cleanForm() {
    this.gameForm.get('localTeamName').setValue('');
    this.gameForm.get('visitingTeamName').setValue('');
  }

  toggleGameForm() {
    this.gameFormAvailable = !this.gameFormAvailable;
    this.cleanForm();
  }

  onGameSubmit() {
    this.disableForm();
    this.processing = true;

    if (this.gameForm.get('localTeamName').value === this.gameForm.get('visitingTeamName').value) {
      this.messageClass = 'alert alert-danger';
      this.showMessage = true;
      this.onSubmitMessage = 'Debes elegir equipos distintos';
      setTimeout(() => {
        this.showMessage = false;
        this.cleanForm();
        this.enableForm();
        this.processing = false;
        return;
      }, 1500);
    } else {
      const game = {
        localTeamName: this.gameForm.get('localTeamName').value,
        visitingTeamName: this.gameForm.get('visitingTeamName').value
      };

      this.gameService.createGame(game)
        .subscribe((data: any) => {
          if (data.success) {
            this.messageClass = 'alert alert-success';
            this.showMessage = true;
            this.onSubmitMessage = data.msg;
            this.getPendingGames();
            setTimeout(() => {
              this.showMessage = false;
              this.cleanForm();
              this.enableForm();
              this.processing = false;
            }, 1500);
          }
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
          }, 1500);
        });
    }

  }

  onGameDelete(id) {
    this.gameService.deleteGame(id)
      .subscribe((data: any) => {
        this.getAllGames();
      },
      (err: any) => {
        this.getAllGames();
      });

  }

  onInitGame(id) {
    this.gameService.initGame(id)
      .subscribe((data: any) => {
        this.getAllGames();
      },
      (err: any) => {
        this.getAllGames();
      });

  }

  getPendingGames() {
    this.gameService.getGames('pending')
      .subscribe((data: any) => {
        if (data.success) {
          this.pendingGames = data.games;
        }
      },
      (err: any) => {
        if (!err.error.success) {
          console.log(err.error.msg);
        }
      });
  }

  getStartedGames() {
    this.gameService.getGames('inProgress')
      .subscribe((data: any) => {
        if (data.success) {
          this.startedGames = data.games;
        }
      },
      (err: any) => {
        if (!err.error.success) {
          console.log(err.error.msg);
        }
      });
  }

  getFinishedGames() {
    this.gameService.getGames('finished')
      .subscribe((data: any) => {
        if (data.success) {
          this.finishedGames = data.games;
        }
      },
      (err: any) => {
        if (!err.error.success) {
          console.log(err.error.msg);
        }
      });
  }

  getAllGames() {
    this.getPendingGames();
    this.getStartedGames();
    this.getFinishedGames();
  }

  getTeamNames() {
    this.teamService.getAllTeams()
      .subscribe((data: any) => {
        if (data.success) {
          // tslint:disable-next-line:prefer-const
          for (let team of data.teams) {
            this.localTeams.push(team.name);
            this.visitingTeams.push(team.name);
          }
        }
      },
      (err: any) => {
        if (!err.error.success) {
          console.log(err.error.msg);
        }
      });
  }

  ngOnInit() {
    this.getAllGames();
    this.getTeamNames();
  }

}
