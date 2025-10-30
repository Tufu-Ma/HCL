import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderNavbarComponent } from '../format/header-navbar/header-navbar.component';
import Swal from 'sweetalert2';

interface CheckoutData {
  game: string;
  accountType: string;
  accountValue: string;
  amount: number;
  method: 'promptpay' | 'truemoney';
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderNavbarComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  data: CheckoutData | null = null;
  isPaying = false;
  isPaid = false;
  orderId = '';
  origin: 'termgame' | 'giftcard' | 'subscription' = 'termgame';

  promptpayImage = 'https://scontent.fbkk29-1.fna.fbcdn.net/v/t1.15752-9/566538890_1130417712554071_1302665028930504060_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_ohc=XnLa62aA9CAQ7kNvwEEBiS3&_nc_oc=AdlxmdjWQ7W7K5CMMYEWZ-f2lmEXrAS10zf-FtDQC4IZXKD0FKNQ58QSZflA99nYq3nXHQXSQvPLk-fGOrYa-GTr&_nc_zt=23&_nc_ht=scontent.fbkk29-1.fna&oh=03_Q7cD3gGV2vRpYvj95bVNxOcobSumAzguJxVgAqNqtQzQUBsYyw&oe=69273DAE';
  truemoneyImage = 'https://scontent.fbkk29-8.fna.fbcdn.net/v/t1.15752-9/566515137_1563838434983163_8875283447229797207_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_ohc=5SFjdmTHZY4Q7kNvwEqLW9X&_nc_oc=AdkWxZ9BbQnxUEpGz_i7907obibAOb_cyvCAEnC0Qae6AumSLNkTz727gjcgmRKkqKGubUjdm22HjMnbOfmyGaGo&_nc_zt=23&_nc_ht=scontent.fbkk29-8.fna&oh=03_Q7cD3gGEfb9vQ9iwNZ9DzzkoR5V7aTT_kaG15uVBCEQTLyoXsw&oe=69274826';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const amount = Number(params['amount'] ?? 0);
      const method = (params['method'] ?? '') as 'promptpay' | 'truemoney';
      const game = String(params['game'] ?? '');
      const accountType = String(params['accountType'] ?? 'UID');
      const accountValue = String(params['accountValue'] ?? '');
      const origin = String(params['origin'] ?? 'termgame');
      if (origin === 'giftcard' || origin === 'subscription' || origin === 'termgame') {
        this.origin = origin as any;
      }
      if (!amount || !method || !game || !accountValue) {
        this.data = null;
        return;
      }
      this.data = { game, amount, method, accountType, accountValue };
    });
  }

  get paymentImage(): string {
    if (!this.data) return '';
    return this.data.method === 'promptpay' ? this.promptpayImage : this.truemoneyImage;
  }

  get accentColor(): string {
    // โทนสีให้เข้ากับช่องทางชำระ
    if (!this.data) return '#0b6ccf';
    return this.data.method === 'promptpay' ? '#0b6ccf' : '#ff6f00';
  }

  get methodLabel(): string {
    if (!this.data) return '';
    return this.data.method === 'promptpay' ? 'PromptPay' : 'TrueMoney';
  }

  payNow(): void {
    if (!this.data || this.isPaid || this.isPaying) return;
    this.isPaying = true;
    // Mock async payment
    setTimeout(() => {
      this.isPaying = false;
      this.isPaid = true;
      this.orderId = 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      // SweetAlert2 success popup
      Swal.fire({
        icon: 'success',
        title: 'ชำระเงินสำเร็จ',
        html: `คำสั่งซื้อ <b>${this.orderId}</b><br/>ช่องทาง <b>${this.methodLabel}</b><br/>ยอดชำระ <b>${this.data!.amount.toLocaleString()} บาท</b>`,
        confirmButtonText: 'เสร็จสิ้น',
        confirmButtonColor: this.accentColor,
        showClass: { popup: 'swal2-show' },
        hideClass: { popup: 'swal2-hide' },
        backdrop: `rgba(0,0,0,0.45)`,
        allowOutsideClick: true
      });
    }, 1200);
  }

  backToGames(): void {
    // kept for compatibility; delegate to backToOrigin
    this.backToOrigin();
  }

  backToOrigin(): void {
    const path = this.origin === 'giftcard' ? '/giftcard'
                : this.origin === 'subscription' ? '/subscription'
                : '/termgame';
    this.router.navigate([path]);
  }
}
