import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  loadYouTubeAPI(): Promise<any> {
    return new Promise((resolve) => {
      if (window['YT'] && window['YT'].Player) {
        resolve(window['YT']);
        return;
      }

      const existing = window['onYouTubeIframeAPIReady'];
      window['onYouTubeIframeAPIReady'] = () => {
        if (existing) existing();
        resolve(window['YT']);
      };
    });
  }
}
