import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderNavbarComponent } from '../../format/header-navbar/header-navbar.component';

interface GameOption {
  rp: number;
  amount: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-lolpc',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderNavbarComponent],
  templateUrl: './lolpc.component.html',
  styleUrl: './lolpc.component.css'
})
export class LolpcComponent {
  constructor(private router: Router) {}
  summonerName = '';
  isValidName = false;
  selectedAmount: number | null = null;
  selectedPayment: string | null = null;

  rpOptions: GameOption[] = [
    { rp: 420, amount: 150 },
    { rp: 880, amount: 300 },
    { rp: 1850, amount: 600 },
    { rp: 3200, amount: 1000 },
    { rp: 5000, amount: 1500 },
    { rp: 7200, amount: 2000 },
    { rp: 13000, amount: 3500 },
    { rp: 25000, amount: 6500 }
  ];

  paymentMethods: PaymentMethod[] = [
    { id: 'promptpay', name: 'PromptPay', icon: 'https://download-th.com/wp-content/uploads/2023/02/ThaiQR.jpg' },
    { id: 'truemoney', name: 'TrueMoney', icon: 'https://download-th.com/wp-content/uploads/2021/02/True-money.jpg' }
  ];

  validateName(): void {
    this.isValidName = this.summonerName.length >= 3 && this.summonerName.length <= 16;
  }

  selectAmount(option: GameOption): void {
    this.selectedAmount = option.amount;
  }

  selectPayment(methodId: string): void {
    this.selectedPayment = methodId;
  }

  confirmTopup(): void {
    if (!this.isValidName || !this.selectedAmount || !this.selectedPayment) {
      return;
    }

    this.router.navigate(['/checkout'], {
      queryParams: {
        game: 'LEAGUE OF LEGENDS PC',
        accountType: 'Summoner Name',
        accountValue: this.summonerName,
        amount: this.selectedAmount,
        method: this.selectedPayment,
        origin: 'termgame',
      },
    });
  }

}
