import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer-navbar.component.html',
  styleUrls: ['./footer-navbar.component.css'],
})
export class FooterNavbarComponent {}
