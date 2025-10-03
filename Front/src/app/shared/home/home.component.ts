import { Component, OnInit } from '@angular/core';
import { GameService, Game } from '../../service/game.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  games: Game[] = [];
  loading = true;
  error = '';

  constructor(private gameApi: GameService) {}

  ngOnInit(): void {
  this.gameApi.listGames().subscribe({
    next: (res) => { 
      this.games = res.filter(g => g.active); // ✅ เก็บเฉพาะ active
      this.loading = false; 
    },
    error: (err) => { 
      this.error = 'โหลดข้อมูลไม่สำเร็จ'; 
      this.loading = false; 
      console.error(err); 
    }
  });
}

  trackById = (_: number, g: Game) => g.id;
}
