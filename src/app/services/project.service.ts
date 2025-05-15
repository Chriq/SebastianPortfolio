import { Injectable } from '@angular/core';
import { Project } from '../interfaces/media';
import { Observable, of, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() {}

  projectMap: BehaviorSubject<Map<string, Project>> = new BehaviorSubject(null);

  loadAllProjects(): Observable<Project[]> {
    let p: Project[] = require('../../data/projects.json');
    this.projectMap.next(this.toMap(p));
    return of(p);
  }

  getProjectById(id: string): Observable<Project> {
    return this.projectMap.pipe(
      map((response) => {
        return response.get(id);
      })
    )
  }

  private toMap(arr: Project[]): Map<string, Project> {
    let map: Map<string, Project> = new Map();
    for(let p of arr) {
      map.set(p.id, p);
    }

    return map;
  }
}
