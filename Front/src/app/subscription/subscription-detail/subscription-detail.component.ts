import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderNavbarComponent } from '../../format/header-navbar/header-navbar.component';

interface SubPlan { label: string; months: number; amount: number }
interface SubConfig {
  id: string; name: string; banner: string; plans: SubPlan[];
}

@Component({
  selector: 'app-subscription-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderNavbarComponent],
  templateUrl: './subscription-detail.component.html',
  styleUrl: './subscription-detail.component.css',
})
export class SubscriptionDetailComponent implements OnInit {
  subs: SubConfig[] = [
    { 
      id: 'netflix', name: 'Netflix', 
      banner: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', 
      plans: [ { label:'1 เดือน', months:1, amount:169 }, { label:'3 เดือน', months:3, amount:499 }, { label:'12 เดือน', months:12, amount:1890 } ] },
    { 
      id: 'disney', name: 'Disney+ Hotstar', 
      banner: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg', 
      plans: [ { label:'1 เดือน', months:1, amount:159 }, { label:'3 เดือน', months:3, amount:459 }, { label:'12 เดือน', months:12, amount:1590 } ] },
    { 
      id: 'max', name: 'Max', 
      banner: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Max_logo.svg', 
      plans: [ { label:'1 เดือน', months:1, amount:199 }, { label:'3 เดือน', months:3, amount:579 }, { label:'12 เดือน', months:12, amount:1990 } ] },
    { 
      id: 'prime', name: 'Prime Video', 
      banner: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png', 
      plans: [ { label:'1 เดือน', months:1, amount:149 }, { label:'3 เดือน', months:3, amount:429 }, { label:'12 เดือน', months:12, amount:1490 } ] },
    { 
      id: 'appletv', name: 'Apple TV+', 
      banner: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV%2B_Logo.svg', 
      plans: [ { label:'1 เดือน', months:1, amount:129 }, { label:'3 เดือน', months:3, amount:369 }, { label:'12 เดือน', months:12, amount:1290 } ] },
    { 
      id: 'viu', name: 'VIU', 
      banner: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Viu_logo.svg', 
      plans: [ { label:'1 เดือน', months:1, amount:119 }, { label:'3 เดือน', months:3, amount:339 }, { label:'12 เดือน', months:12, amount:1190 } ] },
    { 
      id: 'wetv', name: 'WeTV', 
      banner: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/WeTV_logo.svg', 
      plans: [ { label:'1 เดือน', months:1, amount:129 }, { label:'3 เดือน', months:3, amount:359 }, { label:'12 เดือน', months:12, amount:1290 } ] },
    { 
      id: 'iqiyi', name: 'iQIYI', banner: 'https://upload.wikimedia.org/wikipedia/commons/6/61/IQIYI_logo.svg', plans: [ { label:'1 เดือน', months:1, amount:119 }, { label:'3 เดือน', months:3, amount:339 }, { label:'12 เดือน', months:12, amount:1190 } ] },
    { 
      id: 'monomax', name: 'MONOMAX', 
      banner: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Mono_Max_logo.png', 
      plans: [ { label:'1 เดือน', months:1, amount:129 }, { label:'3 เดือน', months:3, amount:359 }, { label:'12 เดือน', months:12, amount:1290 } ] },
    { 
      id: 'trueid', name: 'TrueID', 
      banner: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/TrueID_logo.png', 
      plans: [ { label:'1 เดือน', months:1, amount:99 }, { label:'3 เดือน', months:3, amount:279 }, { label:'12 เดือน', months:12, amount:990 } ] },
  ];

  sub: SubConfig | null = null;
  selectedPlan: SubPlan | null = null;
  selectedAmount: number | null = null;
  selectedPayment: string | null = null;

  paymentMethods = [
    { id: 'promptpay', name: 'PromptPay', icon: 'https://download-th.com/wp-content/uploads/2023/02/ThaiQR.jpg' },
    { id: 'truemoney', name: 'TrueMoney', icon: 'https://download-th.com/wp-content/uploads/2021/02/True-money.jpg' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

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
