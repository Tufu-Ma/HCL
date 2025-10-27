import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marvelrivals',
  standalone: false,
  templateUrl: './marvelrivals.component.html',
  styleUrl: './marvelrivals.component.css'
})
export class MarvelrivalsComponent {
  constructor(private router: Router) {}
  uid = '';
  isValidUid = false;
  selectedAmount: number | null = null;
  selectedPayment: string | null = null;

  options = [
    { coins: 500, amount: 159 },
    { coins: 1200, amount: 379 },
    { coins: 2500, amount: 759 },
    { coins: 5200, amount: 1490 }
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
        game: 'MARVEL RIVALS',
        accountType: 'UID',
        accountValue: this.uid,
        amount: this.selectedAmount,
        method: this.selectedPayment,
        origin: 'termgame',
      },
    });
  }
}
