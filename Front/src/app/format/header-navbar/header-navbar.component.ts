import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-navbar',
  standalone: false,
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css']
})
export class HeaderNavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  username = '';
  isBrowser = false;

  menuOpen = false; // ✅ ใช้แทน dropdown ของ bootstrap

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.checkLogin();
    }
  }

  checkLogin(): void {
    if (!this.isBrowser) return;

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    this.isLoggedIn = !!token;
    this.isAdmin = role === 'admin';
    this.username = username || '';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    if (!this.isBrowser) return;

    Swal.fire({
      title: 'ออกจากระบบ?',
      text: 'คุณต้องการออกจากระบบหรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ออกจากระบบ',
      cancelButtonText: 'ยกเลิก'
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.username = '';
        this.menuOpen = false;
        this.router.navigate(['/login']);
      }
    });
  }
}
