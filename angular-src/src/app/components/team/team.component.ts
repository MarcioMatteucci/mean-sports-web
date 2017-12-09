import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { TeamService } from './../../services/team.service';
import { ITeam } from '../../models/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: ITeam[] = [];
  isSuccess = false;
  teamFormAvailable = false;
  isValidTeamName = true;

  // Form
  teamForm: FormGroup;
  name: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50)
  ]);
  imageUrl: FormControl = new FormControl('', Validators.required);

  constructor(
    private teamService: TeamService
  ) { }

  createForm() {
    this.teamForm = new FormGroup({
      name: this.name,
      imageUrl: this.imageUrl
    });
  }

  cleanForm() {
    this.teamForm.reset();
  }

  toggleTeamForm() {
    this.teamFormAvailable = !this.teamFormAvailable;
    this.cleanForm();
  }

  checkTeamName() {
    const currentName = this.name.value;
    this.isValidTeamName = true;
    if (currentName !== null) {
      this.teamService.getTeamByName(currentName)
        .subscribe(data => {
          const result: any = data;
          if (result.success) {
            if (result.team.name === currentName) {
              this.isValidTeamName = false;
              console.log(this.isValidTeamName);
            } else {
              this.isValidTeamName = true;
              console.log(this.isValidTeamName);
            }
          } else {
            this.isValidTeamName = false;
            console.log(this.isValidTeamName);
          }
        });
    }
  }

  ngOnInit() {
    // Form
    this.createForm();

    // Get all Teams
    this.teamService.getAllTeams()
      .subscribe(data => {
        this.isSuccess = data.success;
        this.teams = data.teams;
        // console.log(this.isSuccess);
        // console.log(this.teams);
      });
  }

}
