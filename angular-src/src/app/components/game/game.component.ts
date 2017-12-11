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

  games: IGame[] = [];
  gameFormAvailable = false;
  localTeams: string[] = [];
  visitingTeams: string[] = [];
  selectedLocalTeam: ITeam;
  selectedVisitingTeam: ITeam;
  processing = false;

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

  toggleGameForm() {
    this.gameFormAvailable = !this.gameFormAvailable;
  }

  onGameSubmit() {

  }

  getGames() {
    this.gameService.getAllGames()
      .subscribe((data: any) => {
        if (data.success) {
          this.games = data.games;
        }
      },
      (err: any) => {
        if (!err.error.success) {
          console.log(err.error.msg);
        }
      });
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
    this.getGames();
    this.getTeamNames();

    setTimeout(() => {
      console.log(this.localTeams);
      console.log(this.visitingTeams);
    }, 2000);
  }

}
