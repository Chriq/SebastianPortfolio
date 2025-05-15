import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

/**
 * While any size image will work, I have found images of 8:1 aspect ratio look best in the banner
 */

const PAGE_TITLES: {[id: string] : string} = {
  home: "Sebastian Segura",
  portfolio: "Works",
  about: "About Me",
  contact: "Contact"
}

@Component({
  selector: 'app-banner',
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements AfterViewInit {
  @ViewChild('heroImage') heroImage!: ElementRef;

  bannerPath: string;
  title: string;
  subtitle: string;

  constructor(private router: Router, private ngZone: NgZone) { }

  ngAfterViewInit(): void {
      this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        if(this.router.url.startsWith("/portfolio/")) return;

        let path = this.santizePath(this.router.url);
        this.bannerPath = path + "-" + "banner.png";

        this.title = PAGE_TITLES[path];
        switch(path) {
          case "home":
            this.subtitle = "Writer | Director | Cinematographer | Editor";
            break;
          case "contact":
            this.subtitle = "sebastiangsegura@gmail.com";
            break;
          default:
            this.subtitle = null;
        }

        this.triggerFadeUp();
        console.log(this.subtitle);
      }
    })
  }

  santizePath(url: string): string {
    return url.replace("/", "");
  }

  

  triggerFadeUp(): void {
    this.ngZone.run(() => {
      const el = this.heroImage.nativeElement;
      el.classList.remove('hero-image-container');
      void el.offsetWidth;
      el.classList.add('hero-image-container');
    });
  }
}
