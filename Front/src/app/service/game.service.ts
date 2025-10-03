// src/app/service/game.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Game {
  id: number;
  name: string;
  slug?: string;
  coverurl?: string;
  description?: string;
  active?: boolean;
}

export interface GamePrice {
  id: number;
  gameId: number;
  title: string;
  priceThb: number;
  iconurl?: string;
  rank?: number;
  active?: boolean;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly base = 'http://localhost:3000/api'; // ปรับตามพอร์ต backend

  constructor(private http: HttpClient) { }

  listGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.base}/games`);
  }

  getGame(idOrSlug: number | string): Observable<Game> {
    return this.http.get<Game>(`${this.base}/games/${idOrSlug}`);
  }

  // ✅ เพิ่ม: สร้างเกมใหม่
  createGame(payload: Partial<Game>): Observable<Game> {
    return this.http.post<Game>(`${this.base}/games`, payload);
  }

  // ✅ เพิ่ม: เพิ่มราคาของเกม
  addGamePrice(gameId: number, payload: Omit<GamePrice, 'id' | 'gameId'>): Observable<GamePrice> {
    return this.http.post<GamePrice>(`${this.base}/games/${gameId}/prices`, payload);
  }

  // (ตัวช่วย) ส่งหลายราคาในครั้งเดียวหลังสร้างเกมเสร็จ
  addManyPrices(gameId: number, items: Array<Omit<GamePrice, 'id' | 'gameId'>>): Observable<GamePrice[]> {
    if (!items?.length) return new Observable(obs => { obs.next([]); obs.complete(); });
    return forkJoin(items.map(p => this.addGamePrice(gameId, p)));
  }

  getPrices(gameId: number | string): Observable<GamePrice[]> {
    return this.http.get<GamePrice[]>(`${this.base}/games/${gameId}/prices`);
  }

  updateGame(id: number, payload: Partial<Game>): Observable<Game> {
    return this.http.put<Game>(`${this.base}/games/${id}`, payload);
  }

  updatePrice(gameId: number, priceId: number, payload: Partial<GamePrice>): Observable<GamePrice> {
    return this.http.put<GamePrice>(`${this.base}/games/${gameId}/prices/${priceId}`, payload);
  }

  deleteGame(id: number) {
    return this.http.delete(`${this.base}/games/${id}`);
  }

  deletePrice(gameId: number, priceId: number) {
    return this.http.delete(`${this.base}/games/${gameId}/prices/${priceId}`);
  }


}
