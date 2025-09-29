// src/app/service/game.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Game {
  id: number;
  name: string;
  slug?: string;
  coverurl?: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly base = 'http://localhost:3000/api'; // ปรับตามพอร์ต backend

  constructor(private http: HttpClient) {}

  listGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.base}/games`);
  }

  getGame(idOrSlug: number | string): Observable<Game> {
    return this.http.get<Game>(`${this.base}/games/${idOrSlug}`);
  }
}
