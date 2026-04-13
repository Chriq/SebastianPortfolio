import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';


@Component({
  selector: 'app-header',
  imports: [CommonModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatButtonModule, MatMenuModule, OverlayModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) { }

  menuOpen = false;

  menuOptions: string[] = [
    "Home",
    "Portfolio",
    "About",
    "Contact"
  ];

  portfolioSubMenu: string[] = [
    "Writer",
    "Director",
    "Producer",
    "Cinematographer",
    "Editor"
  ]

  p = "Portfolio";

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  navigateTo(route: string, option?: string) {
    let params = {
      queryParams: { filters: [] }
    };

    if (option) params.queryParams.filters = [option];

    this.router.navigate([route.toLowerCase()], params);
  }




  public timedOutCloser;
  public targetMenuTrigger;
  mouseEnter(trigger) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  mouseLeave(trigger) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 50);
  }
}
