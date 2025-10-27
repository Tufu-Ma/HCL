import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wildrift',
  standalone: false,
  templateUrl: './wildrift.component.html',
  styleUrl: './wildrift.component.css'
})
export class WildriftComponent {
  constructor(private router: Router) {}
  uid = '';
  isValidUid = false;
  selectedAmount: number | null = null;
  selectedPayment: string | null = null;

  options: { coins: number; amount: number }[] = [
    { coins: 100, amount: 49 },
    { coins: 250, amount: 119 },
    { coins: 500, amount: 229 },
    { coins: 1200, amount: 549 },
    { coins: 2500, amount: 1090 },
    { coins: 5200, amount: 2090 }
  ];

  paymentMethods = [
    { id: 'promptpay', name: 'PromptPay', icon: 'https://download-th.com/wp-content/uploads/2023/02/ThaiQR.jpg' },
    { id: 'truemoney', name: 'TrueMoney', icon: 'https://download-th.com/wp-content/uploads/2021/02/True-money.jpg' }
  ];

  validateUid(): void {
    this.isValidUid = /^\d{6,20}$/.test(this.uid.trim());
  }

  selectAmount(option: { coins: number; amount: number }): void {
    this.selectedAmount = option.amount;
  }

  selectPayment(methodId: string): void {
    this.selectedPayment = methodId;
  }

  confirmTopup(): void {
    if (!this.isValidUid || !this.selectedAmount || !this.selectedPayment) return;
    this.router.navigate(['/checkout'], {
      queryParams: {
        game: 'LEAGUE OF LEGENDS: WILD RIFT',
        accountType: 'UID',
        accountValue: this.uid,
        amount: this.selectedAmount,
        method: this.selectedPayment,
        origin: 'termgame',
      },
    });
  }
}
