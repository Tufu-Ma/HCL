// src/app/admin/add-game-detail/add-game-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService, Game, GamePrice } from '../../service/game.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-game-detail',
  standalone: false,
  templateUrl: './add-game-detail.component.html',
  styleUrls: ['./add-game-detail.component.css']
})
export class AddGameDetailComponent implements OnInit {
  game?: Game;
  prices: GamePrice[] = [];

  // ฟอร์มแก้ไขข้อมูลเกม
  gameForm!: FormGroup;

  // ฟอร์มเพิ่มราคา
  priceForm!: FormGroup;

  // ฟอร์มแก้ไขราคา (inline)
  editForm?: FormGroup;
  editingId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private gameApi: GameService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForms();

    // ✅ autoslug ขณะพิมพ์: ถ้าผู้ใช้ยังไม่แตะ slug (ไม่ dirty) จะ sync จาก name อัตโนมัติ
    const nameCtrl = this.gameForm.get('name');
    const slugCtrl = this.gameForm.get('slug');
    nameCtrl?.valueChanges.subscribe((val: string) => {
      if (!slugCtrl?.dirty) {
        slugCtrl?.setValue(this.slugify(val || ''), { emitEvent: false });
      }
    });

    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadGame(id);
    this.loadPrices(id);
  }

  private buildForms() {
    // ✅ ฟอร์มข้อมูลเกม
    this.gameForm = this.fb.group({
      name: ['', Validators.required],
      slug: [''],
      coverurl: [''],
      description: ['']
    });

    // ✅ ฟอร์มเพิ่มราคา (rank ให้ backend จัดการเอง)
    this.priceForm = this.fb.group({
      title: ['', Validators.required],
      priceThb: [0, [Validators.required, Validators.min(1)]],
      iconurl: ['']
    });
  }

  // ---------- helpers ----------
  private slugify(s: string): string {
    return s
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, '-')      // เว้นวรรค/ขีดล่าง -> ขีดกลาง
      .replace(/[^a-z0-9-]/g, '')   // ตัดอักขระพิเศษออก
      .replace(/-+/g, '-')          // ขีดกลางซ้ำ -> ขีดเดียว
      .replace(/^-+|-+$/g, '');     // ตัดขีดหัว/ท้าย
  }

  // ---------- GAME ----------
  loadGame(id: string) {
    this.gameApi.getGame(id).subscribe({
      next: g => {
        this.game = g;
        this.gameForm.patchValue({
          name: g.name ?? '',
          slug: g.slug ?? '',
          coverurl: g.coverurl ?? '',
          description: g.description ?? ''
        });
      },
      error: () => Swal.fire('ผิดพลาด', 'โหลดข้อมูลเกมไม่สำเร็จ', 'error')
    });
  }

  updateGame() {
    if (!this.game) return;
    if (this.gameForm.invalid) {
      this.gameForm.markAllAsTouched();
      return;
    }

    const raw = this.gameForm.value;

    // ✅ ถ้า slug ว่าง ให้สร้างจาก name อัตโนมัติ
    let slug = (raw.slug || '').trim();
    if (!slug && raw.name) {
      slug = this.slugify(raw.name);
    }

    const payload: Partial<Game> = {
      name: raw.name?.trim() || undefined,
      slug: slug || undefined,
      coverurl: raw.coverurl?.trim() || undefined,
      description: raw.description?.trim() || undefined
    };

    this.gameApi.updateGame(this.game.id, payload).subscribe({
      next: g => {
        this.game = g; // sync
        Swal.fire('สำเร็จ', 'อัปเดตข้อมูลเกมเรียบร้อย', 'success');
      },
      error: err => Swal.fire('ผิดพลาด', err?.error?.message || 'อัปเดตเกมไม่สำเร็จ', 'error')
    });
  }

  toggleGameActive() {
    if (!this.game) return;
    this.gameApi.updateGame(this.game.id, { active: !this.game.active }).subscribe({
      next: g => this.game = g,
      error: () => Swal.fire('ผิดพลาด', 'สลับสถานะเกมไม่สำเร็จ', 'error')
    });
  }

  // ---------- PRICES ----------
  loadPrices(id: string) {
    this.gameApi.getPrices(id).subscribe({
      next: p => this.prices = p,
      error: () => Swal.fire('ผิดพลาด', 'โหลดราคาล้มเหลว', 'error')
    });
  }

  addPrice() {
    if (!this.game) return;
    if (this.priceForm.invalid) {
      this.priceForm.markAllAsTouched();
      return;
    }

    const raw = this.priceForm.value;
    const payload = {
      title: (raw.title || '').trim(),
      priceThb: Number(raw.priceThb),
      iconurl: raw.iconurl?.trim() || undefined
    };

    this.gameApi.addGamePrice(this.game.id, payload).subscribe({
      next: (p) => {
        this.prices.push(p);
        this.priceForm.reset({ title: '', priceThb: 0, iconurl: '' });
        Swal.fire('สำเร็จ!', 'เพิ่มราคาเรียบร้อยแล้ว', 'success');
      },
      error: (err) => {
        Swal.fire('ผิดพลาด', err.error?.message || 'ไม่สามารถเพิ่มราคาได้', 'error');
      }
    });
  }

  startEdit(price: GamePrice) {
    this.editingId = price.id;
    this.editForm = this.fb.group({
      title: [price.title, Validators.required],
      priceThb: [price.priceThb, [Validators.required, Validators.min(1)]],
      iconurl: [price.iconurl || '']
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.editForm = undefined;
  }

  saveEdit(price: GamePrice) {
    if (!this.editForm || this.editForm.invalid) return;
    const raw = this.editForm.value;

    const payload = {
      title: (raw.title || '').trim(),
      priceThb: Number(raw.priceThb),
      iconurl: raw.iconurl?.trim() || undefined
    };

    this.gameApi.updatePrice(price.gameId, price.id, payload).subscribe({
      next: p => {
        Object.assign(price, p);
        this.cancelEdit();
        Swal.fire('สำเร็จ', 'อัปเดตราคาเรียบร้อย', 'success');
      },
      error: err => Swal.fire('ผิดพลาด', err?.error?.message || 'อัปเดตราคาไม่สำเร็จ', 'error')
    });
  }

  togglePriceActive(price: GamePrice) {
    this.gameApi.updatePrice(price.gameId, price.id, { active: !price.active }).subscribe({
      next: p => price.active = p.active,
      error: () => Swal.fire('ผิดพลาด', 'สลับสถานะราคาไม่สำเร็จ', 'error')
    });
  }

  deletePrice(price: GamePrice) {
    Swal.fire({
      title: 'ยืนยันการลบ?',
      text: `คุณต้องการลบ "${price.title}" ใช่หรือไม่?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    }).then(result => {
      if (!result.isConfirmed) return;

      this.gameApi.deletePrice(price.gameId, price.id).subscribe({
        next: () => {
          this.prices = this.prices.filter(p => p.id !== price.id);
          Swal.fire('ลบแล้ว!', 'แพ็กเกจถูกลบเรียบร้อย', 'success');
        },
        error: (err) => {
          Swal.fire('ผิดพลาด', err.error?.message || 'ไม่สามารถลบได้', 'error');
        }
      });
    });
  }

  onImgError(e: Event, fallback: string = 'assets/testBG.jpg') {
    const img = e.target as HTMLImageElement;
    if (!img) return;
    img.onerror = null;      // ป้องกันวนลูป
    img.src = fallback;      // ใช้รูปสำรอง
  }
}
