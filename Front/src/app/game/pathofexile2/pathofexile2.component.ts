import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pathofexile2',
  standalone: false,
  templateUrl: './pathofexile2.component.html',
  styleUrl: './pathofexile2.component.css'
})
export class Pathofexile2Component {
  constructor(private router: Router) {}
  uid = '';
  isValidUid = false;
  selectedAmount: number | null = null;
  selectedPayment: string | null = null;

  options = [
    { coins: 50, amount: 49 },
    { coins: 100, amount: 89 },
    { coins: 200, amount: 169 },
    { coins: 500, amount: 399 },
    { coins: 1000, amount: 789 }
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
        game: 'PATH OF EXILE 2',
        accountType: 'UID',
        accountValue: this.uid,
        amount: this.selectedAmount,
        method: this.selectedPayment,
        origin: 'termgame',
      },
    });
  }
}
