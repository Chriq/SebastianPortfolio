import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../interfaces/media';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, MatDividerModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  projects: Project[];

  ngOnInit() {
    this.projectService.loadAllProjects().subscribe((response) => {
      this.projects = response;
    });
  }

  openProjectDetails() {

  }

  navigateTo(route: string) {
    this.router.navigate(['portfolio/', route]);
  }
  
  getCoverImage(p: Project): string {
    // TODO: called 2x
    //console.log(p.id);
    return "https://i.ytimg.com/vi/" + p.ytVideoId + "/maxresdefault.jpg";
  }
}
