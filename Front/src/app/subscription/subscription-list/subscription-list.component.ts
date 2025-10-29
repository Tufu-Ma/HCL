import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderNavbarComponent } from '../../format/header-navbar/header-navbar.component';
import { FooterNavbarComponent } from "../../format/footer-navbar/footer-navbar.component";

interface SubItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

@Component({
  selector: 'app-subscription-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderNavbarComponent, FooterNavbarComponent],
  templateUrl: './subscription-list.component.html',
  styleUrl: './subscription-list.component.css',
})
export class SubscriptionListComponent {
  items: SubItem[] = [
    { id: 'netflix', name: 'Netflix', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { id: 'disney', name: 'Disney+ Hotstar', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg' },
    { id: 'max', name: 'Max', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/HBO_Max_%282025%29.svg/1280px-HBO_Max_%282025%29.svg.png' },
    { id: 'prime', name: 'Prime Video', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png' },
    { id: 'appletv', name: 'Apple TV+', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Apple_TV_Plus_Logo.svg/1920px-Apple_TV_Plus_Logo.svg.png' },
    { id: 'viu', name: 'VIU', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Viu_logo.svg/597px-Viu_logo.svg.png?20210908043125' },
    { id: 'wetv', name: 'WeTV', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/WeTV_logo.svg/1200px-WeTV_logo.svg.png?20220130115800' },
    { id: 'iqiyi', name: 'iQIYI', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Iqiyi_Logo_Baru.png' },
    { id: 'monomax', name: 'MONOMAX', subtitle: 'ต่ออายุสมาชิก', image: 'https://play-lh.googleusercontent.com/YUNOy-jcb0dhR-r9c1P40BO4zizZwBpK8IoSvTP8Zh4aBTWxtYgaUsZILF8v-6sMehi2=w480-h960-rw' },
    { id: 'trueid', name: 'TrueID', subtitle: 'ต่ออายุสมาชิก', image: 'https://cms.dmpcdn.com/misc/2022/02/09/af7de880-89ab-11ec-8c0c-590a22d85d91_webp_original.webp' },
  ];

  trackById(index: number, item: SubItem) { return item.id; }
}

