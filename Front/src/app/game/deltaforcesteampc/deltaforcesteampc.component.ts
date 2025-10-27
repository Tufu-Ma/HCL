import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deltaforcesteampc',
  standalone: false,
  templateUrl: './deltaforcesteampc.component.html',
  styleUrl: './deltaforcesteampc.component.css'
})
export class DeltaforcesteampcComponent {
  constructor(private router: Router) {}
  uid = '';
  isValidUid = false;
  selectedAmount: number | null = null;
  selectedPayment: string | null = null;

  options = [
    { coins: 500, amount: 149 },
    { coins: 1100, amount: 329 },
    { coins: 2400, amount: 699 },
    { coins: 5000, amount: 1390 }
  ];

  paymentMethods = [
    { id: 'promptpay', name: 'PromptPay', icon: 'https://download-th.com/wp-content/uploads/2023/02/ThaiQR.jpg' },
    { id: 'truemoney', name: 'TrueMoney', icon: 'https://download-th.com/wp-content/uploads/2021/02/True-money.jpg' }
  ];

  validateUid(): void { this.isValidUid = /^\d{6,20}$/.test(this.uid.trim()); }
  selectAmount(o: any): void { this.selectedAmount = o.amount; }
  selectPayment(id: string): void { this.selectedPayment = id; }
  confirmTopup(): void {
    if (!this.isValidUid || !this.selectedAmount || !this.selectedPayment) return;
    this.router.navigate(['/checkout'], {
      queryParams: {
        game: 'DELTA FORCE (STEAM PC)',
        accountType: 'UID/Steam ID',
        accountValue: this.uid,
        amount: this.selectedAmount,
        method: this.selectedPayment,
        origin: 'termgame',
      },
    });
  }
}
