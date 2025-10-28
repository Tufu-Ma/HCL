import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService, Game, GamePrice } from '../../service/game.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-game-detail',
  standalone: false,
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  routeParam!: string;
  game?: Game;
  prices: GamePrice[] = [];

  loading = true;
  error: string | null = null;

  // สถานะการล็อกอินเว็บ
  isLoggedIn = false;

  // เก็บข้อมูลสำหรับการเติม
  topupData = {
    loginId: '',
    password: '',
    loginMethod: 'gmail', // default
    characterName: '',
    level: ''
  };

  // แพ็กเกจที่เลือก
  selectedPriceId: number | null = null;
  selectedPrice?: GamePrice;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameApi: GameService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  /* ----------------- Safe localStorage helpers ----------------- */

  private safeGet(key: string): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private safeSet(key: string, value: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem(key, value);
    } catch {/* ignore */ }
  }

  private safeRemove(key: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.removeItem(key);
    } catch {/* ignore */ }
  }

  private validateToken(token: string | null): boolean {
    if (!token) return false;
    const t = token.trim();
    if (!t) return false;
    if (t.toLowerCase() === 'null') return false;
    if (t.toLowerCase() === 'undefined') return false;
    if (t === '{}') return false;
    return true;
  }

  /** เรียกทุกครั้งที่เราอยาก sync สถานะล็อกอินกับ localStorage */
  private refreshLoginState() {
    const rawToken = this.safeGet('token'); // <-- ใช้ key ที่คุณเก็บ token จริง
    this.isLoggedIn = this.validateToken(rawToken || null);
  }

  /** โหลดข้อมูลเกม + ราคา */
  private loadGameAndPrices(idOrSlug: string) {
    this.loading = true;
    this.error = null;
    this.game = undefined;
    this.prices = [];
    this.selectedPriceId = null;
    this.selectedPrice = undefined;

    this.gameApi.getGame(idOrSlug).subscribe({
      next: g => {
        this.game = g;
        this.loading = false;
        this.loadPricesByGameId(g.id);
      },
      error: err => {
        this.error = err?.error?.message || 'โหลดข้อมูลเกมไม่สำเร็จ';
        this.loading = false;
      }
    });
  }

  private loadPricesByGameId(realId: number) {
    this.gameApi.getPrices(realId).subscribe({
      next: list => {
        this.prices = list
          .filter(p => p.active !== false)
          .sort((a, b) => a.priceThb - b.priceThb); // ✅ เรียงราคาจากน้อยไปมาก
      },
      error: () => {
        this.prices = [];
      }
    });
  }


  /* ----------------- Angular lifecycle ----------------- */

  ngOnInit(): void {
    // เราจะ subscribe paramMap แทน snapshot
    // เพื่อให้โค้ดวิ่งใหม่ทุกครั้งที่ :id เปลี่ยน หรือคุณกลับเข้าหน้านี้อีกครั้ง
    this.route.paramMap.subscribe(paramMap => {
      // 1) อัปเดตสถานะ login สด ๆ
      this.refreshLoginState();

      // 2) อ่าน /game/:id
      this.routeParam = paramMap.get('id') || '';
      if (!this.routeParam) {
        this.error = 'ไม่พบรหัสเกม';
        this.loading = false;
        return;
      }

      // 3) โหลดข้อมูลเกมและแพ็กเกจ
      this.loadGameAndPrices(this.routeParam);
    });
  }

  /* ----------------- UI handlers ----------------- */

  // รูป fallback
  onImgError(e: Event, fallback: string = 'assets/testBG.jpg') {
    const img = e.target as HTMLImageElement;
    if (!img) return;
    img.onerror = null;
    img.src = fallback;
  }

  // คลิกเลือก / ยกเลิกแพ็กเกจ
  selectPackage(pkg: GamePrice) {
    // toggle: ถ้าคลิกแพ็กเกจเดิม → ยกเลิก
    if (this.selectedPriceId === pkg.id) {
      this.selectedPriceId = null;
      this.selectedPrice = undefined;
      this.safeRemove('checkout_packet');
      return;
    }

    // เลือกแพ็กเกจใหม่
    this.selectedPriceId = pkg.id;
    this.selectedPrice = pkg;

    this.safeSet(
      'checkout_packet',
      JSON.stringify({
        gameId: this.game?.id,
        gameName: this.game?.name,
        packetId: pkg.id,
        packetTitle: pkg.title,
        priceThb: pkg.priceThb
      })
    );
  }

  // ไปหน้า login
  goLogin() {
    this.router.navigate(['/login']);
  }

  // ไปหน้า checkout
  goCheckout() {
    this.safeSet(
      'checkout_playerinfo',
      JSON.stringify({
        loginId: this.topupData.loginId,
        password: this.topupData.password,
        loginMethod: this.topupData.loginMethod,
        characterName: this.topupData.characterName,
        level: this.topupData.level
      })
    );

    this.router.navigate(['/checkout']);
  }
}
