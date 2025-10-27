import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderNavbarComponent } from '../../format/header-navbar/header-navbar.component';

interface GiftCardItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

@Component({
  selector: 'app-giftcard-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderNavbarComponent],
  templateUrl: './giftcard-list.component.html',
  styleUrl: './giftcard-list.component.css',
})
export class GiftcardListComponent {
  items: GiftCardItem[] = [
    { id: 'truemoney', name: 'TrueMoney Wallet', subtitle: 'True Money', image: 'https://seeklogo.com/images/T/true-money-wallet-logo-7B3E0B7880-seeklogo.com.png' },
    { id: 'razergold', name: 'Razer Gold (TH)', subtitle: 'Razer PIN ไทย', image: 'https://cdn.worldvectorlogo.com/logos/razer-gold-1.svg' },
    { id: 'steam', name: 'Steam Wallet (TH)', subtitle: 'Steam wallet THB', image: 'https://store.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg' },
    { id: 'unipin', name: 'UniPin TH', subtitle: 'UniPin Thailand', image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/UniPin_Logo_2021.png' },
    { id: 'roblox-th', name: 'Roblox Gift Card (TH)', subtitle: 'เฉพาะสกุล TH', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Roblox_Logo_2017.svg' },
    { id: 'garena', name: 'Garena Shells', subtitle: 'Garena Card', image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Garena_Logo.png' },
    { id: 'googleplay', name: 'Google Play Gift Code', subtitle: 'Android/Play Store', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Google_Play_2016_icon.svg' },
    { id: 'itunes', name: 'Apple Gift Card', subtitle: 'iTunes/App Store', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 'psn', name: 'PlayStation Store', subtitle: 'PSN Wallet', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/PlayStation_logo.svg' },
    { id: 'nintendo-us', name: 'Nintendo eShop (US)', subtitle: 'เฉพาะ US', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Nintendo.svg' },
  ];

  trackById(index: number, item: GiftCardItem): string {
    return item.id;
  }
}
