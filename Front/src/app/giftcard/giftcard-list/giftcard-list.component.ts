import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderNavbarComponent } from '../../format/header-navbar/header-navbar.component';
import { FooterNavbarComponent } from "../../format/footer-navbar/footer-navbar.component";

interface GiftCardItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

@Component({
  selector: 'app-giftcard-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderNavbarComponent, FooterNavbarComponent],
  templateUrl: './giftcard-list.component.html',
  styleUrl: './giftcard-list.component.css',
})
export class GiftcardListComponent {
  items: GiftCardItem[] = [
    { 
      id: 'truemoney', name: 'TrueMoney Wallet', 
      subtitle: 'True Money', 
      image: 'https://www.lnwtrue.com/_next/image?url=https%3A%2F%2Fmedia.lnwtrue.com%2Fimages%2Fproducts%2Ftruemoney%2F2pZU0f1lN336hY.webp&w=256&q=75' },
    { 
      id: 'razergold', name: 'Razer Gold (TH)', 
      subtitle: 'Razer PIN ไทย', 
      image: 'https://cdn.topuplive.com/cdn-cgi/image/format=webp/uploads/images/goods/v4/c/C-43.webp' },
    { 
      id: 'steam', name: 'Steam Wallet (TH)', 
      subtitle: 'Steam wallet THB', 
      image: 'https://www.lnwtrue.com/_next/image?url=https%3A%2F%2Fmedia.lnwtrue.com%2Fimages%2Fproducts%2Fsteam-wallet%2F942Ybfe2Fdoylz.webp&w=256&q=75' },
    { 
      id: 'riot', name: 'RIOT Gift Card', 
      subtitle: 'Riot Games', 
      image: 'https://www.lnwtrue.com/_next/image?url=https%3A%2F%2Fmedia.lnwtrue.com%2Fimages%2Fproducts%2Friot-gift-card%2FPUfKnWFUpaOPo2.webp&w=256&q=75' },
    { 
      id: 'roblox-th', name: 'Roblox Gift Card (TH)', 
      subtitle: 'เฉพาะสกุล TH', 
      image: 'https://www.lnwtrue.com/_next/image?url=https%3A%2F%2Fmedia.lnwtrue.com%2Fimages%2Fproducts%2Froblox-gift-card%2FDMUXnycNvwmaw5.webp&w=256&q=75' },
    { 
      id: 'garena', name: 'Garena Shells', 
      subtitle: 'Garena Card', 
      image: 'https://www.lnwtrue.com/_next/image?url=https%3A%2F%2Fmedia.lnwtrue.com%2Fimages%2Fproducts%2Fgarena%2FXVAgyLqTRooRnB.webp&w=256&q=75' },
    { 
      id: 'googleplay', name: 'Google Play Gift Code', 
      subtitle: 'Android/Play Store', 
      image: 'https://www.gstatic.com/marketing-cms/assets/images/54/c1/b36390cd43f9b868208f908bde30/th-th.png=n-w371-h512-fcrop64=1,00000000ffffffff-rw' },
    { 
      id: 'itunes', name: 'Apple Gift Card', 
      subtitle: 'iTunes/App Store', 
      image: 'https://psnthailand.in.th/images/backend/product/2/2025-5-7153920.jpg' },
    { 
      id: 'psn', name: 'PlayStation Store', 
      subtitle: 'PSN Wallet', 
      image: 'https://imgproxy.eneba.games/EyzNc6VTedA-3jHuUn75uEDw1ulxMMhjMXVTx7x5cMU/rs:fit:350/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy82/elJrZHdhclZDV0x2/c0lCd0IxSWdjLXFH/bVpPTDJ1dlRuaVVm/Y0xjeE9nLmpwZw' },
    { 
      id: 'line-prepaid', name: 'LINE Prepaid Card', 
      subtitle: 'LINE', 
      image: 'https://www.lnwtrue.com/_next/image?url=https%3A%2F%2Fmedia.lnwtrue.com%2Fimages%2Fproducts%2Fline-prepaid-card%2FTOqwNdr8klDNtK.webp&w=256&q=75' },
  ];

  trackById(index: number, item: GiftCardItem): string {
    return item.id;
  }
}
