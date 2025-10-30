import {
  Component, OnInit, OnDestroy, HostListener,
  Inject, PLATFORM_ID, Output, EventEmitter
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css']
})
export class HeaderNavbarComponent implements OnInit, OnDestroy {
  /** ---------- Config ---------- */
  /** ให้สอดคล้องกับ CSS media query ของคุณ (เช่น @media (max-width: 768px)) */
  readonly MOBILE_BP = 768;

  /** ---------- Platform / resize ---------- */
  isBrowser = false;
  viewportW = 1024; // ค่าเริ่มต้นกันพังฝั่ง SSR

  /** ---------- UI State ---------- */
  drawerOpen = false;   // สำหรับ mobile drawer (burger)
  menuOpen = false;     // สำหรับ dropdown เล็ก ๆ (ถ้าใช้บนเดสก์ท็อป)

  /** ---------- Auth State ---------- */
  isLoggedIn = false;
  isAdmin = false;
  username = '';
  userProfileImage: string | null = null;

  /** ---------- Search ---------- */
  searchTerm = '';
  @Output() searchChange = new EventEmitter<string>();

  /** ---------- Internals ---------- */
  private routerSub?: Subscription;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /** helper: ขณะนี้ถือว่าอยู่โหมด mobile หรือไม่ */
  get isMobile(): boolean {
    return this.viewportW <= this.MOBILE_BP;
  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.viewportW = window.innerWidth;
      this.checkLogin();

      // ปิด drawer อัตโนมัติเมื่อเปลี่ยน route
      this.routerSub = this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          if (this.drawerOpen) this.setDrawer(false);
          // ป้องกัน focus/scroll แปลก ๆ ตอนย้ายหน้า:
          this.menuOpen = false;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.routerSub) this.routerSub.unsubscribe();
    // เผื่อปิดล็อก scroll
    this.setBodyLocked(false);
  }

  /** ---------- Resize listener (เฉพาะ browser) ---------- */
  @HostListener('window:resize')
  onWindowResize() {
    if (!this.isBrowser) return;
    this.viewportW = window.innerWidth;

    // เมื่อขยายจอเกิน breakpoint ให้ปิด drawer เพื่อกลับไปใช้ navbar ปกติ
    if (!this.isMobile && this.drawerOpen) {
      this.setDrawer(false);
    }
  }

  /** ---------- Auth ---------- */
  checkLogin(): void {
    if (!this.isBrowser) return;

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatar');

    this.isLoggedIn = !!token;
    this.isAdmin = role === 'admin';
    this.username = username || '';
    this.userProfileImage = avatar || null;
  }

logout(): void {
  if (!this.isBrowser) return;

  // ปิด dropdown และ drawer ก่อน เพื่อไม่ให้ alert ซ่อนอยู่ข้างหลัง
  this.menuOpen = false;
  this.setDrawer(false);

  // หน่วงนิดหน่อยให้ Drawer ปิด animation เสร็จ แล้วค่อย alert
  setTimeout(() => {
    Swal.fire({
      title: 'ออกจากระบบ?',
      text: 'คุณต้องการออกจากระบบหรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ออกจากระบบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#d33',
      background: '#1f1a1d',
      color: '#fff',
      backdrop: true, // ✅ บังคับให้อยู่ด้านหน้า Drawer
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.username = '';
        this.router.navigate(['/login']);
      }
    });
  }, 250);
}

  /** ---------- Drawer / Menus ---------- */
  toggleDrawer() {
    this.setDrawer(!this.drawerOpen);
  }

  closeDrawer() {
    this.setDrawer(false);
  }

  private setDrawer(open: boolean) {
    this.drawerOpen = open;
    // ล็อกการสกรอลล์ฉากหลังเมื่อเปิด drawer (รองรับ CSS .body--locked)
    this.setBodyLocked(open);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  private setBodyLocked(locked: boolean) {
    if (!this.isBrowser) return;
    const body = document.body;
    if (locked) {
      body.classList.add('body--locked');
    } else {
      body.classList.remove('body--locked');
    }
  }

  /** ---------- Search ---------- */
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement)?.value ?? this.searchTerm;
    this.searchTerm = value;
    this.searchChange.emit(this.searchTerm);
  }

  /** ---------- Utils ---------- */
  onImgError(e: Event) {
    (e.target as HTMLImageElement).src = 'assets/default-profile.png';
  }

  /** ใช้กับลิงก์ใน Drawer: ไปหน้าใหม่และปิด Drawer */
  navigateAndClose(url: string) {
    this.router.navigateByUrl(url);
    if (this.isMobile) this.setDrawer(false);
  }

  // ------------ ปิด dropdown ------------
@HostListener('document:click', ['$event'])
onClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const clickedInsideDropdown =
    target.closest('.btn-profile') || target.closest('.dropdown-menu');

  if (!clickedInsideDropdown && this.menuOpen) {
    this.menuOpen = false;
  }
}
}
