import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TeamService } from './../../services/team.service';
import { ITeam } from '../../models/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: ITeam[] = [];
  teamFormAvailable = false;
  messageClass: String;
  showMessage = false;
  onSubmitMessage: String;
  processing = false;

  teamForm: FormGroup;

  constructor(
    private teamService: TeamService
  ) {
    this.createTeamForm();
  }

  createTeamForm() {
    this.teamForm = new FormGroup({
      name: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ],
        updateOn: 'change'
      }),
      imageUrl: new FormControl('', {
        updateOn: 'change'
      })
    });
  }

  disableForm() {
    this.teamForm.controls['name'].disable();
    this.teamForm.controls['imageUrl'].disable();
  }

  enableForm() {
    this.teamForm.controls['name'].enable();
    this.teamForm.controls['imageUrl'].enable();
  }

  cleanForm() {
    this.teamForm.reset();
  }

  toggleTeamForm() {
    this.teamFormAvailable = !this.teamFormAvailable;
    this.cleanForm();
  }

  onTeamSubmit() {
    this.disableForm();
    this.processing = true;

    if (!this.teamForm.get('imageUrl').value) {
      this.teamForm.setValue({
        name: this.teamForm.get('name').value,
        imageUrl: 'https://image.flaticon.com/icons/png/512/36/36601.png'
      });
    }

    const team = {
      name: this.teamForm.get('name').value,
      imageUrl: this.teamForm.get('imageUrl').value
    };

    this.teamService.createTeam(team)
      .subscribe((data: any) => {
        if (data.success) {
          this.messageClass = 'alert alert-success';
          this.showMessage = true;
          this.onSubmitMessage = data.msg;
          this.getTeams();
          setTimeout(() => {
            this.showMessage = false;
            this.cleanForm();
            this.enableForm();
            this.processing = false;
          }, 1500);
        }
      },
      (err: any) => {
        if (err.status === 403) {
          this.messageClass = 'alert alert-danger';
          this.showMessage = true;
          this.onSubmitMessage = err.error.msg;
          setTimeout(() => {
            this.showMessage = false;
            this.cleanForm();
            this.enableForm();
            this.processing = false;
          }, 1500);
        }
      });
  }

  onTeamDelete(id) {
    this.teamService.deleteTeam(id)
      .subscribe((data: any) => {
        this.getTeams();
      },
      (err: any) => {
        this.getTeams();
      });
  }

  getTeams() {
    this.teamService.getAllTeams()
      .subscribe((data: any) => {
        this.teams = data.teams;
      });
  }

  ngOnInit() {
    this.getTeams();
  }

}
