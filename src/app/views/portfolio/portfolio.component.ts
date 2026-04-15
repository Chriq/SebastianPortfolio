import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Project, VimeoResponse } from '../../interfaces/media';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, MatDividerModule, MatTabsModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit, OnChanges {

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation?.extras.state;
    // if (Object.hasOwn(state, "filters")) {
    //   console.log(state["filters"]);
    //   this.filters = state["filters"];
    //   navigation.extras.state = {};
    // }
    this.projectService.loadAllProjects().subscribe((response) => {
      this.allProjects = response;
      this.updateDisplayedProjects(this.filters);
    });
  }

  allProjects: Project[];
  displayedProjects: Project[];
  @Input() filters: string[];

  ngOnInit() {
    // this.projectService.loadAllProjects().subscribe((response) => {
    //   this.allProjects = response;
    //   this.updateDisplayedProjects(this.filters);
    // });
  }

  ngOnChanges() {
    this.updateDisplayedProjects(this.filters);
  }

  openProjectDetails() {

  }

  navigateTo(route: string) {
    this.router.navigate(['portfolio/', route]);
  }



  updateDisplayedProjects(selectedRoles: string[]) {
    let project = this.allProjects;
    if (selectedRoles?.length > 0) {
      project = this.allProjects
        .filter((track) => {
          return selectedRoles.some((selected) => {
            return track.roles.some((trackTag) => trackTag === selected);
          });
        })
    }

    this.displayedProjects = project.sort((track1, track2) => {
      let t1 = new Date(track1.releaseDate).getTime();
      let t2 = new Date(track2.releaseDate).getTime();

      if(t1 !== t2) {
        return t2 - t1;
      } else {
        return track1.title.localeCompare(track2.title);
      }
      
    });
  }
}
