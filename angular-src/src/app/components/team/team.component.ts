import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { TeamService } from './../../services/team.service';
import { ITeam } from '../../models/team';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: ITeam[] = [];
  isSuccess = false;
  teamFormAvailable = false;
  teamCreated = false;
  successMessage = '';
  errorMessage = '';

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

  cleanForm() {
    this.teamForm.reset();
  }

  toggleTeamForm() {
    this.teamFormAvailable = !this.teamFormAvailable;
    this.cleanForm();
  }

  onTeamSubmit() {
    const team = {
      name: this.teamForm.get('name').value,
      imageUrl: this.teamForm.get('imageUrl').value
    };

    this.teamService.createTeam(team)
      .subscribe((data: any) => {
        if (data.success) {
          this.teamCreated = true;
          this.successMessage = data.msg;
        } else if (!data.success) {
          this.teamCreated = false;
          this.errorMessage = data.msg;
        }
      });
  }

  ngOnInit() {
    this.teamService.getAllTeams()
      .subscribe((data: any) => {
        this.isSuccess = data.success;
        this.teams = data.teams;
      });
  }

}
