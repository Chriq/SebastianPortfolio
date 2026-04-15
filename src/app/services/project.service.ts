import { Injectable } from '@angular/core';
import { Project, VimeoResponse } from '../interfaces/media';
import { Observable, of, BehaviorSubject, map, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  projectMap: BehaviorSubject<Map<string, Project>> = new BehaviorSubject(null);

  loadAllProjects(): Observable<Project[]> {
    let p: Project[] = require('../../data/projects.json');
    this.projectMap.next(this.toMap(p));
    p.forEach(project => {
      this.getThumbnailUrl(project).then((respose) => {
        project.thumbnailUrl = respose;
      });
    });
    return of(p);
  }

  getProjectById(id: string): Observable<Project> {
    this.loadAllProjects();
    return this.projectMap.pipe(
      map((response) => {
        return response.get(id);
      })
    )
  }

  private toMap(arr: Project[]): Map<string, Project> {
    let map: Map<string, Project> = new Map();
    for (let p of arr) {
      map.set(p.id, p);
    }

    return map;
  }

  async getThumbnailUrl(p: Project): Promise<string> {
    if (p.thumbnailUrl) {
      return p.thumbnailUrl;
    }

    if (p.videoHost === 'YOUTUBE') {
      return "https://i.ytimg.com/vi/" + p.videoId + "/maxresdefault.jpg";
    } else {
      let vimeoInfo: VimeoResponse = await firstValueFrom(this.fetchVimeoInfo(p.videoId));
      return vimeoInfo.thumbnail_url;
    }
  }

  public fetchVimeoInfo(videoId: string): Observable<VimeoResponse> {
    let vimeoUrl = "https://vimeo.com/api/oembed.json?url=http%3A//vimeo.com/" + videoId;
    return this.http.get<VimeoResponse>(vimeoUrl);
  }
}
