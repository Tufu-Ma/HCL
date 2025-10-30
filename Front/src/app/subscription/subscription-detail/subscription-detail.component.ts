import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderNavbarComponent } from '../../format/header-navbar/header-navbar.component';
import { FooterNavbarComponent } from "../../format/footer-navbar/footer-navbar.component";

interface SubPlan { label: string; months: number; amount: number }
interface SubConfig {
  id: string; name: string; banner: string; plans: SubPlan[];
}

@Component({
  selector: 'app-subscription-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderNavbarComponent, FooterNavbarComponent],
  templateUrl: './subscription-detail.component.html',
  styleUrl: './subscription-detail.component.css',
})
export class SubscriptionDetailComponent implements OnInit {
  subs: SubConfig[] = [
    {
      id: 'netflix', name: 'Netflix',
      banner: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
      plans: [{ label: '1 เดือน', months: 1, amount: 169 }, { label: '3 เดือน', months: 3, amount: 499 }, { label: '12 เดือน', months: 12, amount: 1890 }]
    },
    {
      id: 'disney', name: 'Disney+ Hotstar',
      banner: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
      plans: [{ label: '1 เดือน', months: 1, amount: 159 }, { label: '3 เดือน', months: 3, amount: 459 }, { label: '12 เดือน', months: 12, amount: 1590 }]
    },
    {
      id: 'max', name: 'Max',
      banner: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/HBO_Max_%282025%29.svg/1280px-HBO_Max_%282025%29.svg.png',
      plans: [{ label: '1 เดือน', months: 1, amount: 199 }, { label: '3 เดือน', months: 3, amount: 579 }, { label: '12 เดือน', months: 12, amount: 1990 }]
    },
    {
      id: 'prime', name: 'Prime Video',
      banner: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png',
      plans: [{ label: '1 เดือน', months: 1, amount: 149 }, { label: '3 เดือน', months: 3, amount: 429 }, { label: '12 เดือน', months: 12, amount: 1490 }]
    },
    {
      id: 'appletv', name: 'Apple TV+',
      banner: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Apple_TV_Plus_Logo.svg/1920px-Apple_TV_Plus_Logo.svg.png',
      plans: [{ label: '1 เดือน', months: 1, amount: 129 }, { label: '3 เดือน', months: 3, amount: 369 }, { label: '12 เดือน', months: 12, amount: 1290 }]
    },
    {
      id: 'viu', name: 'VIU',
      banner: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Viu_logo.svg/597px-Viu_logo.svg.png?20210908043125',
      plans: [{ label: '1 เดือน', months: 1, amount: 119 }, { label: '3 เดือน', months: 3, amount: 339 }, { label: '12 เดือน', months: 12, amount: 1190 }]
    },
    {
      id: 'wetv', name: 'WeTV',
      banner: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/WeTV_logo.svg/1200px-WeTV_logo.svg.png?20220130115800',
      plans: [{ label: '1 เดือน', months: 1, amount: 129 }, { label: '3 เดือน', months: 3, amount: 359 }, { label: '12 เดือน', months: 12, amount: 1290 }]
    },
    {
      id: 'iqiyi', name: 'iQIYI', banner: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Iqiyi_Logo_Baru.png', 
      plans: [{ label: '1 เดือน', months: 1, amount: 119 }, { label: '3 เดือน', months: 3, amount: 339 }, { label: '12 เดือน', months: 12, amount: 1190 }]
    },
    {
      id: 'monomax', name: 'MONOMAX',
      banner: 'https://scontent.fbkk30-1.fna.fbcdn.net/v/t1.15752-9/552197742_1148676740773243_7764047517347308499_n.png?_nc_cat=111&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeGK0_oRV7U3K3mQDbbKMXBicfCZTrC753Jx8JlOsLvncgP3lZ6oxVKeyDEkV2srM4TMhlETvG2nBN3g0zrmWicM&_nc_ohc=tW-vaC2ZNJAQ7kNvwG5_vI-&_nc_oc=AdlvKP1As2s9GIkIrnkldeWb5s-ETquKsz3dRtzqHd3KbGjP1D89QP_LHQ4BbxfygZhBEGpj_QJhQ6LRzQLv9nhr&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fbkk30-1.fna&oh=03_Q7cD3gEsGxa5gkCBtNTf6yzQ6RXWuRIufioJDkZ5LLJydCpykw&oe=69298C8C',
      plans: [{ label: '1 เดือน', months: 1, amount: 129 }, { label: '3 เดือน', months: 3, amount: 359 }, { label: '12 เดือน', months: 12, amount: 1290 }]
    },
    {
      id: 'trueid', name: 'TrueID',
      banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMAKQK0KUFJ_o456NtTGhYr4H47I-hRh4rkA&s',
      plans: [{ label: '1 เดือน', months: 1, amount: 99 }, { label: '3 เดือน', months: 3, amount: 279 }, { label: '12 เดือน', months: 12, amount: 990 }]
    },
  ];

  sub: SubConfig | null = null;
  selectedPlan: SubPlan | null = null;
  selectedAmount: number | null = null;
  selectedPayment: string | null = null;

  paymentMethods = [
    { id: 'promptpay', name: 'PromptPay', icon: 'https://download-th.com/wp-content/uploads/2023/02/ThaiQR.jpg' },
    { id: 'truemoney', name: 'TrueMoney', icon: 'https://download-th.com/wp-content/uploads/2021/02/True-money.jpg' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.sub = this.subs.find(s => s.id === id) || null;
  }

  selectAmount(p: SubPlan): void { this.selectedPlan = p; this.selectedAmount = p.amount; }
  selectPayment(id: string): void { this.selectedPayment = id; }

  confirm(): void {
    if (!this.sub || !this.selectedAmount || !this.selectedPayment) return;
    this.router.navigate(['/checkout'], {
      queryParams: {
        game: `${this.sub.name} Gift Code`,
        accountType: 'Gift Card',
        accountValue: this.selectedPlan ? this.selectedPlan.label : 'Digital Code',
        amount: this.selectedAmount,
        method: this.selectedPayment,
        origin: 'subscription',
      }
    });
  }
}
