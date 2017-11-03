import { Component, OnInit } from '@angular/core';

import { TeamService } from './../../services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  result: any;

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamService.getAllTeams()
      .subscribe(data => {
        this.result = data;
        console.log(this.result);
      });
  }

}
