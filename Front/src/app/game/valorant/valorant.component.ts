import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderNavbarComponent } from '../../format/header-navbar/header-navbar.component';

interface VPOption {
  vp: number;
  amount: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-valorant',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderNavbarComponent],
  templateUrl: './valorant.component.html',
  styleUrl: './valorant.component.css'
})
export class ValorantComponent {
  constructor(private router: Router) {}
  uid = '';
  isValidUid = false;
  selectedAmount: number | null = null;
  selectedPayment: string | null = null;

  vpOptions: VPOption[] = [
    { vp: 475, amount: 159 },
    { vp: 1000, amount: 315 },
    { vp: 2050, amount: 629 },
    { vp: 3650, amount: 1089 },
    { vp: 5350, amount: 1579 },
    { vp: 7000, amount: 2039 }
  ];

  paymentMethods: PaymentMethod[] = [
    { id: 'promptpay', name: 'PromptPay', icon: 'https://download-th.com/wp-content/uploads/2023/02/ThaiQR.jpg' },
    { id: 'truemoney', name: 'TrueMoney', icon: 'https://download-th.com/wp-content/uploads/2021/02/True-money.jpg' }
  ];

  validateUid(): void {
    const riotIdPattern = /^[a-zA-Z0-9]{3,16}#[a-zA-Z0-9]{3,5}$/;
    this.isValidUid = riotIdPattern.test(this.uid);
  }

  selectAmount(option: VPOption): void {
    this.selectedAmount = option.amount;
  }

  selectPayment(methodId: string): void {
    this.selectedPayment = methodId;
  }

  confirmTopup(): void {
    if (!this.isValidUid || !this.selectedAmount || !this.selectedPayment) {
      return;
    }

    this.router.navigate(['/checkout'], {
      queryParams: {
        game: 'VALORANT',
        accountType: 'Riot ID',
        accountValue: this.uid,
        amount: this.selectedAmount,
        method: this.selectedPayment,
        origin: 'termgame',
      },
    });
  }
}
