import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderNavbarComponent } from '../../format/header-navbar/header-navbar.component';

interface CardConfig {
  id: string;
  name: string;
  banner: string;
  currency: string;
  options: { value: number; amount: number }[]; // value=ยอดในบัตร, amount=ราคา/บาท
}

@Component({
  selector: 'app-giftcard-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderNavbarComponent],
  templateUrl: './giftcard-detail.component.html',
  styleUrl: './giftcard-detail.component.css',
})
export class GiftcardDetailComponent implements OnInit {
  cards: CardConfig[] = [
    {
      id: 'truemoney',
      name: 'TrueMoney Gift Card',
      banner: 'https://www.truemoney.com/wp-content/uploads/2024/12/payouts-article-01-banner-20241206-1100x550-1.jpg',
      currency: '฿',
      options: [ { value: 100, amount: 100 }, { value: 200, amount: 200 }, { value: 300, amount: 300 }, { value: 500, amount: 500 } ],
    },
    {
      id: 'razergold',
      name: 'Razer Gold (TH) PIN',
      banner: 'https://imgproxy.eneba.games/uDZf8V902R_aBMR5TMUVpuBb3SValJL3QMQ1AcjcCEA/rs:fit:350/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9t/ak54LXFVWVJnVkNU/aHNYN0N4amNxVW5f/WEtVcDhrVDAwdFE0/RzRSWTFvLmpwZw',
      currency: '฿',
      options: [ { value: 100, amount: 105 }, { value: 300, amount: 310 }, { value: 500, amount: 510 }, { value: 1000, amount: 1010 } ],
    },
    {
      id: 'steam',
      name: 'Steam Wallet (TH)',
      banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-yfb7oZBxWa-SM-cb8wT24D8WDdUEKdGBkw&s',
      currency: '฿',
      options: [ { value: 100, amount: 100 }, { value: 250, amount: 250 }, { value: 500, amount: 500 }, { value: 1000, amount: 1000 } ],
    },
    {
      id: 'riot',
      name: 'RIOT Gift Card',
      banner: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Riot_Games_Logo.svg',
      currency: '฿',
      options: [ { value: 100, amount: 100 }, { value: 300, amount: 300 }, { value: 500, amount: 500 }, { value: 1000, amount: 1000 } ],
    },
    {
      id: 'roblox-th',
      name: 'Roblox Gift Card (TH)',
      banner: 'https://tb-storage-bucket.s3.ap-south-1.amazonaws.com/webstore/adminblockriticom/images/048983ef-2762-4161-98ef-8530c293ed22.webp',
      currency: '฿',
      options: [ { value: 200, amount: 200 }, { value: 400, amount: 400 }, { value: 800, amount: 800 } ],
    },
    {
      id: 'garena',
      name: 'Garena Shells',
      banner: 'https://seagm-media.seagmcdn.com/item_480/211.png?x-oss-process=image/resize,w_360',
      currency: 'Shells',
      options: [ { value: 50, amount: 50 }, { value: 100, amount: 100 }, { value: 200, amount: 200 } ],
    },
    { 
      id: 'googleplay', 
      name: 'Google Play Gift Code', 
      banner: 'https://shop.theclub.com.hk/media/catalog/product/cache/325fd8d4f7eaef1af70e0a1582ef0e80/p/l/playgift_1000.jpg', 
      currency: '฿', 
      options: [ { value: 200, amount: 200 }, { value: 500, amount: 500 }, { value: 1000, amount: 1000 } ] },
    { 
      id: 'itunes', 
      name: 'Apple Gift Card', 
      banner: 'https://seagm-media.seagmcdn.com/item_480/1467.png?x-oss-process=image/resize,w_360', 
      currency: '฿', options: [ { value: 300, amount: 300 }, { value: 500, amount: 500 }, { value: 1000, amount: 1000 } ] },
    { 
      id: 'psn', 
      name: 'PlayStation Store Wallet', 
      banner: '<img src="https://www.nicepng.com/png/detail/236-2366850_free-psn-codes-gift-card-playstation-com-logo.png" alt="Free Psn Codes Gift Card - Playstation Com Logo@nicepng.com">', 
      currency: '฿', options: [ { value: 200, amount: 200 }, { value: 500, amount: 500 } ] },
    { 
      id: 'line-prepaid', 
      name: 'LINE Prepaid Card', 
      banner: 'https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg', 
      currency: '฿', 
      options: [ { value: 50, amount: 50 }, { value: 100, amount: 100 }, { value: 300, amount: 300 } ] },
  ];

  card: CardConfig | null = null;
  selectedAmount: number | null = null;
  selectedPayment: string | null = null;

  paymentMethods = [
    { id: 'promptpay', name: 'PromptPay', icon: 'https://download-th.com/wp-content/uploads/2023/02/ThaiQR.jpg' },
    { id: 'truemoney', name: 'TrueMoney', icon: 'https://download-th.com/wp-content/uploads/2021/02/True-money.jpg' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.card = this.cards.find(c => c.id === id) || null;
  }

  selectAmount(option: { value: number; amount: number }): void {
    this.selectedAmount = option.amount;
  }

  selectPayment(id: string): void { this.selectedPayment = id; }

  confirm(): void {
    if (!this.card || !this.selectedAmount || !this.selectedPayment) return;
    this.router.navigate(['/checkout'], {
      queryParams: {
        game: `${this.card.name}`,
        accountType: 'Gift Code',
        accountValue: this.card.currency,
        amount: this.selectedAmount,
        method: this.selectedPayment,
        origin: 'giftcard',
      }
    });
  }
}
