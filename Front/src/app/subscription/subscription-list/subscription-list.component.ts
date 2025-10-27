import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderNavbarComponent } from '../../format/header-navbar/header-navbar.component';

interface SubItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

@Component({
  selector: 'app-subscription-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderNavbarComponent],
  templateUrl: './subscription-list.component.html',
  styleUrl: './subscription-list.component.css',
})
export class SubscriptionListComponent {
  items: SubItem[] = [
    { id: 'netflix', name: 'Netflix', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { id: 'disney', name: 'Disney+ Hotstar', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg' },
    { id: 'max', name: 'Max', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Max_logo.svg' },
    { id: 'prime', name: 'Prime Video', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png' },
    { id: 'appletv', name: 'Apple TV+', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV%2B_Logo.svg' },
    { id: 'viu', name: 'VIU', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Viu_logo.svg' },
    { id: 'wetv', name: 'WeTV', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/WeTV_logo.svg' },
    { id: 'iqiyi', name: 'iQIYI', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/IQIYI_logo.svg' },
    { id: 'monomax', name: 'MONOMAX', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Mono_Max_logo.png' },
    { id: 'trueid', name: 'TrueID', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/TrueID_logo.png' },
  ];

  trackById(index: number, item: SubItem) { return item.id; }
}

