import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  email: string = "sebastiangsegura@gmail.com";
  insta: string = "";
  linkedin: string = "https://www.linkedin.com/in/sebastian-segura-a46492226/";

  iconSize = 64;

  // do not set manually, use CSS variable below
  iconColor: string = "FFFFFF";

  ngOnInit() {
    this.iconColor = this.getCssVariable('--text-secondary').replace("#", "");
  }

  getCssVariable(name: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  }
}
