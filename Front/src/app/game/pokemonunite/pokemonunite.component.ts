import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemonunite',
  standalone: false,
  templateUrl: './pokemonunite.component.html',
  styleUrl: './pokemonunite.component.css'
})
export class PokemonuniteComponent {
  constructor(private router: Router) {}
  uid = '';
  isValidUid = false;
  selectedAmount: number | null = null;
  selectedPayment: string | null = null;

  options = [
    { coins: 60, amount: 35 },
    { coins: 300, amount: 179 },
    { coins: 600, amount: 349 },
    { coins: 1500, amount: 879 },
    { coins: 3000, amount: 1690 }
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
        game: 'POKEMON UNITE',
        accountType: 'UID',
        accountValue: this.uid,
        amount: this.selectedAmount,
        method: this.selectedPayment,
        origin: 'termgame',
      },
    });
  }
}
