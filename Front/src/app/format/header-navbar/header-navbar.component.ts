import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css'],
})
export class HeaderNavbarComponent {
  searchTerm: string = '';
  @Output() searchChange = new EventEmitter<string>();

  onSearch(event: any) {
    if (location.pathname === '/termgame') {
      this.searchChange.emit(this.searchTerm);
    }
  }
}
