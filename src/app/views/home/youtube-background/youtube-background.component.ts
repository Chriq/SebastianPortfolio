import { Component, ElementRef, Input } from '@angular/core';

declare var YT: any;

@Component({
  selector: 'youtube-background',
  imports: [],
  templateUrl: './youtube-background.component.html',
  styleUrl: './youtube-background.component.scss'
})
export class YoutubeBackgroundComponent {

  @Input() videoId: string;

  private player: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    if (window['YT']) {
      this.createPlayer();
    } else {
      window['onYouTubeIframeAPIReady'] = () => this.createPlayer();
    }
  }

  createPlayer(): void {
    this.player = new YT.Player(this.elementRef.nativeElement.querySelector('#video-background'), {
      videoId: this.videoId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        loop: 1,
        showinfo: 0,
        modestbranding: 1,
        rel: 0
      },
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this)
      }
    });
  }

  onPlayerReady(event: any): void {
    console.log('Player is ready');
  }

  onPlayerStateChange(event: any): void {
    if (event.data === YT.PlayerState.PLAYING) {
      this.monitorPlaybackTime();
    }
  }

  monitorPlaybackTime(): void {
    const interval = setInterval(() => {
      const currentTime = this.player.getCurrentTime();
      const duration = this.player.getDuration();

      if (currentTime >= duration - 1) {
        this.player.seekTo(0);
        this.player.playVideo();
        clearInterval(interval);
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.destroy();
    }
  }
}
