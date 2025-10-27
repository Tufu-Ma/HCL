import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teamfight-tactic',
  standalone: false,
  templateUrl: './teamfight-tactic.component.html',
  styleUrl: './teamfight-tactic.component.css'
})
export class TeamfightTacticComponent {
  constructor(private router: Router) {}
  uid = '';
  isValidUid = false;
  selectedAmount: number | null = null;
  selectedPayment: string | null = null;

  options: { coins: number; amount: number }[] = [
    { coins: 300, amount: 99 },
    { coins: 700, amount: 199 },
    { coins: 1500, amount: 399 },
    { coins: 3200, amount: 799 },
    { coins: 6600, amount: 1599 }
  ];

  paymentMethods = [
    { id: 'promptpay', name: 'PromptPay', icon: 'https://download-th.com/wp-content/uploads/2023/02/ThaiQR.jpg' },
    { id: 'truemoney', name: 'TrueMoney', icon: 'https://download-th.com/wp-content/uploads/2021/02/True-money.jpg' }
  ];

  validateUid(): void { this.isValidUid = /^\d{6,20}$/.test(this.uid.trim()); }
  selectAmount(option: { coins: number; amount: number }): void { this.selectedAmount = option.amount; }
  selectPayment(methodId: string): void { this.selectedPayment = methodId; }
  confirmTopup(): void {
    if (!this.isValidUid || !this.selectedAmount || !this.selectedPayment) return;
    this.router.navigate(['/checkout'], {
      queryParams: {
        game: 'TEAMFIGHT TACTICS',
        accountType: 'UID',
        accountValue: this.uid,
        amount: this.selectedAmount,
        method: this.selectedPayment,
        origin: 'termgame',
      },
    });
  }
}
