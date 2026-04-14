import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { YoutubeBackgroundComponent } from './youtube-player/youtube-background/youtube-background.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home',
  imports: [SafeUrlPipe, YoutubeBackgroundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('yt') ytElement!: ElementRef;
  @ViewChild('name') nmElement!: ElementRef;

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  private cdkVirtualScrollViewport!: CdkVirtualScrollViewport;

  reelUrl = "https://www.youtube.com/embed/J4taJk9VpPE";

  vHeight = "975px";
  nHeight = "450px";

  ngAfterViewInit() {
    this.calculateScrollHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateScrollHeight();
  }

  calculateScrollHeight() {
    let calcHeight = 0;

    const videoHeight = this.ytElement["elementRef"].nativeElement.firstChild.clientHeight;
    if (videoHeight && videoHeight > 0) {
      this.vHeight = videoHeight + "px";
    }

    const nameHeight = this.nmElement.nativeElement.offsetHeight;
    if (nameHeight && nameHeight > 0) {
      this.nHeight = nameHeight + "px";
    }

    // this.vHeight = calcHeight + "px";
  }
}


