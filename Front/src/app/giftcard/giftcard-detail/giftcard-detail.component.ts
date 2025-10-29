import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderNavbarComponent } from '../../format/header-navbar/header-navbar.component';
import { FooterNavbarComponent } from "../../format/footer-navbar/footer-navbar.component";

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
  imports: [CommonModule, RouterModule, FormsModule, HeaderNavbarComponent, FooterNavbarComponent],
  templateUrl: './giftcard-detail.component.html',
  styleUrl: './giftcard-detail.component.css',
})
export class GiftcardDetailComponent implements OnInit {
  cards: CardConfig[] = [
    {
      id: 'truemoney',
      name: 'TrueMoney Gift Card',
      banner: 'https://www.buriram-police.com/wp-content/uploads/2023/02/Logo-True-money-wallet.png',
      currency: '฿',
      options: [ { value: 100, amount: 100 }, { value: 200, amount: 200 }, { value: 300, amount: 300 }, { value: 500, amount: 500 } ],
    },
    {
      id: 'razergold',
      name: 'Razer Gold (TH) PIN',
      banner: 'https://scontent.fbkk30-1.fna.fbcdn.net/v/t1.15752-9/568667074_3686133144857534_3664708284610732269_n.png?stp=dst-png_p394x394&_nc_cat=102&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeF2X_cq3rRbVFl-iWA5mxASIOdrM4qVRFcg52szipVEV2ZitDb3suszv2-Wwa6D1SAwwe1H6qVK_SR5_kxmNhBJ&_nc_ohc=e3cpeTK5RrAQ7kNvwGcM3Sm&_nc_oc=Adm2feCZ5ME5h0NQWUXyi9dm2lcBisiIOpMxhGxyA4eN83vMjmMaP91XRwF6b0qAnEdTvf_6CaC4Swlv0wnAAepP&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fbkk30-1.fna&oh=03_Q7cD3gGy5S3Zs0wqMemqwPSsLAEwIOk3X8QW99q-MMe0HRfEOg&oe=692999AB',
      currency: '฿',
      options: [ { value: 100, amount: 105 }, { value: 300, amount: 310 }, { value: 500, amount: 510 }, { value: 1000, amount: 1010 } ],
    },
    {
      id: 'steam',
      name: 'Steam Wallet (TH)',
      banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStaINFU2aHGdGdBpOuBMogY6gsBHq57s-PqQ&s',
      currency: '฿',
      options: [ { value: 100, amount: 100 }, { value: 250, amount: 250 }, { value: 500, amount: 500 }, { value: 1000, amount: 1000 } ],
    },
    {
      id: 'riot',
      name: 'RIOT Gift Card',
      banner: 'https://upload.wikimedia.org/wikipedia/de/thumb/d/d2/Riot_Games_logo.svg/2560px-Riot_Games_logo.svg.png',
      currency: '฿',
      options: [ { value: 100, amount: 100 }, { value: 300, amount: 300 }, { value: 500, amount: 500 }, { value: 1000, amount: 1000 } ],
    },
    {
      id: 'roblox-th',
      name: 'Roblox Gift Card (TH)',
      banner: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Roblox_Red_2017_Logo.png/1200px-Roblox_Red_2017_Logo.png',
      currency: '฿',
      options: [ { value: 200, amount: 200 }, { value: 400, amount: 400 }, { value: 800, amount: 800 } ],
    },
    {
      id: 'garena',
      name: 'Garena Shells',
      banner: 'https://upload.wikimedia.org/wikipedia/id/f/f7/Garena_Logo.png',
      currency: 'Shells',
      options: [ { value: 50, amount: 50 }, { value: 100, amount: 100 }, { value: 200, amount: 200 } ],
    },
    { 
      id: 'googleplay', 
      name: 'Google Play Gift Code', 
      banner: 'https://metrikal.io/blog/wp-content/uploads/2020/10/new-google-play-store-mobile-1280x720-1-1024x576.jpg', 
      currency: '฿', 
      options: [ { value: 200, amount: 200 }, { value: 500, amount: 500 }, { value: 1000, amount: 1000 } ] },
    { 
      id: 'itunes', 
      name: 'Apple Gift Card', 
      banner: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/apple-gift-cards-landing-202006_FMT_WHH?wid=1346&hei=542&fmt=jpeg&qlt=90&.v=U0EzaXNyc2ZlYWVYR0IxNTgwM2hBME5zQlgvRVFJUjNqYU9JT0FyeFk1OElpUVF1MW1VOWE2d2VGK29qTStJQWpxV2kvMmwxNTQ2MGh0SHNXZ05uakdQZ1RmMGloVUFNTEdubGlmMHdpenBweURRUEMxeThlN3lUVXhsQmlHcnI', 
      currency: '฿', options: [ { value: 300, amount: 300 }, { value: 500, amount: 500 }, { value: 1000, amount: 1000 } ] },
    { 
      id: 'psn', 
      name: 'PlayStation Store Wallet', 
      banner: 'https://logos-world.net/wp-content/uploads/2023/08/Playstation-5-Logo.jpg', 
      currency: '฿', options: [ { value: 200, amount: 200 }, { value: 500, amount: 500 } ] },
    { 
      id: 'line-prepaid', 
      name: 'LINE Prepaid Card', 
      banner: 'https://cdn.freebiesupply.com/logos/large/2x/line-logo-png-transparent.png', 
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
