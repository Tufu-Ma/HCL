// src/app/shared/add-game/add-game.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService, Game } from '../../service/game.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-game',
  standalone: false,
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  form: FormGroup;
  games: Game[] = [];

  submitting = false;
  togglingId: number | null = null;
  deletingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private gameApi: GameService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      slug: [''],
      coverurl: [''],
      description: ['']
    });

    // 🔹 autoslug: ถ้า slug ยังไม่แตะ ให้ sync ตาม name
    this.form.get('name')?.valueChanges.subscribe(val => {
      const slugCtrl = this.form.get('slug');
      if (val && slugCtrl && !slugCtrl.dirty) {
        slugCtrl.setValue(this.slugify(val), { emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.loadGames();
  }

  trackById = (_: number, g: Game) => g.id;

  private slugify(s: string): string {
    return s.toString().trim().toLowerCase()
      .replace(/[\s_]+/g, '-')        // เว้นวรรค/underscore → dash
      .replace(/[^a-z0-9-]/g, '')     // ตัดอักษรพิเศษ
      .replace(/-+/g, '-')            // dash ซ้ำ → dash เดียว
      .replace(/^-+|-+$/g, '');       // ลบ dash หัว/ท้าย
  }

  loadGames(): void {
    this.gameApi.listGames().subscribe({
      next: (res) => this.games = res,
      error: (err) => console.error('Load games error:', err)
    });
  }

  submit(): void {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const raw = this.form.value;
    let slug = (raw.slug || '').trim();
    if (!slug && raw.name) slug = this.slugify(raw.name);

    const payload: Partial<Game> = {
      name: raw.name?.trim() || undefined,
      slug: slug || undefined,
      coverurl: raw.coverurl?.trim() || undefined,
      description: raw.description?.trim() || undefined,
    };

    this.gameApi.createGame(payload)
      .pipe(finalize(() => this.submitting = false))   // ✅ รีเซ็ตเสมอ
      .subscribe({
        next: () => {
          Swal.fire({ icon: 'success', title: 'สำเร็จ!', text: 'สร้างเกมเรียบร้อยแล้ว ✅' });
          // เคลียร์ฟอร์ม + ให้ autoslug กลับมาทำงานรอบใหม่
          this.form.reset();
          this.loadGames();
        },
        error: (err) => {
          const msg = err?.error?.message || '❌ ชื่อเกมหรือ slug นี้มีอยู่แล้ว';
          Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', text: msg });
        }
      });
  }

  toggleActive(game: Game): void {
    if (this.togglingId) return;
    this.togglingId = game.id;

    this.gameApi.updateGame(game.id, { active: !game.active }).subscribe({
      next: (g) => game.active = g.active,
      error: () => {
        Swal.fire({ icon: 'error', title: 'สลับสถานะไม่สำเร็จ', text: 'ลองใหม่อีกครั้ง' });
      },
      complete: () => this.togglingId = null
    });
  }

  deleteGame(game: Game): void {
    if (this.deletingId) return;

    Swal.fire({
      title: `คุณต้องการลบเกม "${game.name}" ใช่หรือไม่?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบเลย',
      cancelButtonText: 'ยกเลิก'
    }).then(result => {
      if (!result.isConfirmed) return;

      this.deletingId = game.id;
      this.gameApi.deleteGame(game.id).subscribe({
        next: () => {
          this.games = this.games.filter(g => g.id !== game.id);
          Swal.fire({ icon: 'success', title: 'ลบสำเร็จ', text: `เกม "${game.name}" ถูกลบเรียบร้อยแล้ว ✅` });
        },
        error: () => {
          Swal.fire({ icon: 'error', title: 'ลบไม่สำเร็จ', text: '❌ เกิดข้อผิดพลาดในการลบเกม' });
        },
        complete: () => this.deletingId = null
      });
    });
  }

  goDetail(game: Game): void {
    this.router.navigate(['/addgame-detail', game.id]);
  }

  // fallback รูป
  onImgError(evt: Event, fallback: string) {
    const img = evt.target as HTMLImageElement | null;
    if (!img) return;
    img.onerror = null; // กันวนลูป
    img.src = fallback;
  }

  hideImg(e: Event) {
    const img = e.target as HTMLImageElement | null;
    if (img) img.style.display = 'none';
  }
}
