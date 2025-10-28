import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderNavbarComponent } from '../../format/header-navbar/header-navbar.component';

interface ProductOption {
  id: string;
  vp: number;
  amount: number;
  tag?: 'ขายดี' | 'คุ้มค่า' | 'ใหม่';
}

interface CartItem {
  id: string;
  vp: number;
  amount: number;
  qty: number;
}

@Component({
  selector: 'app-valorant',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderNavbarComponent],
  templateUrl: './valorant.component.html',
  styleUrl: './valorant.component.css'
})
export class ValorantComponent implements OnInit {
  constructor(private router: Router) {}

  // ePIN products
  products: ProductOption[] = [
  { id: 'v-0475', vp: 475, amount: 125 },
  { id: 'v-1000', vp: 1000, amount: 250 },
  { id: 'v-1475', vp: 1475, amount: 375 },
  { id: 'v-2050', vp: 2050, amount: 500 },
  { id: 'v-2525', vp: 2525, amount: 625 , tag: 'ขายดี' },
  { id: 'v-3050', vp: 3050, amount: 750 },
  { id: 'v-3650', vp: 3650, amount: 884 },
  { id: 'v-4100', vp: 4100, amount: 1000 },
  { id: 'v-4125', vp: 4125, amount: 1009 },
  { id: 'v-4650', vp: 4650, amount: 1134 },
  { id: 'v-5350', vp: 5350, amount: 1268 },
  { id: 'v-5825', vp: 5825, amount: 1393 },
  { id: 'v-6350', vp: 6350, amount: 1518 },
  { id: 'v-6700', vp: 6700, amount: 1634 },
  { id: 'v-6825', vp: 6825, amount: 1643 },
  { id: 'v-7150', vp: 7150, amount: 1750 },
  { id: 'v-7400', vp: 7400, amount: 1768 },
  { id: 'v-7750', vp: 7750, amount: 1884 },
  { id: 'v-7875', vp: 7875, amount: 1893 },
  { id: 'v-8200', vp: 8200, amount: 2000 },
  { id: 'v-8400', vp: 8400, amount: 2018 },
  { id: 'v-8750', vp: 8750, amount: 2134 },
  { id: 'v-8875', vp: 8875, amount: 2143 },
  { id: 'v-9000', vp: 9000, amount: 2152 },
  { id: 'v-9475', vp: 9475, amount: 2277 },
  { id: 'v-9800', vp: 9800, amount: 2384 },
  { id: 'v-10000', vp: 10000, amount: 2402 },
  { id: 'v-11000', vp: 11000, amount: 2535 },
  { id: 'v-12000', vp: 12000, amount: 2785 },
  { id: 'v-13050', vp: 13050, amount: 3035 },
  { id: 'v-14650', vp: 14650, amount: 3419 },
  { id: 'v-16350', vp: 16350, amount: 3803 },
  { id: 'v-22000', vp: 22000, amount: 5070 }
];


  cart: CartItem[] = [];
  selectedPayment: 'promptpay' | 'truemoney' | null = null;
  guideImage = 'https://scontent.fbkk29-9.fna.fbcdn.net/v/t1.15752-9/552642280_1216108724000019_7774795995926808544_n.png?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_aid=0&_nc_ohc=10zSiHRkX9IQ7kNvwEyZUmm&_nc_oc=Adme2j0gAycaM3Od6DGdJWoPaM2AUq0BEnFshu7WrBAigAtOpAfOZNpa39J9B4-OjBcktvIjrImCt5EO1dsqv4AL&_nc_zt=23&_nc_ht=scontent.fbkk29-9.fna&oh=03_Q7cD3gGXRfXZb7I6K_338wprtBhR4UTndgJMUww-aMhvesrJJQ&oe=69281BD2';
  isLightboxOpen = false;

  riotTag = '';
  isValidTag = false;
  validateTag(): void {
    const pattern = /^[a-zA-Z0-9]{3,16}#[a-zA-Z0-9]{3,5}$/;
    this.isValidTag = pattern.test(this.riotTag.trim());
  }
  ngOnInit(): void {
    const saved = localStorage.getItem('saved.riotTag.valorant');
    if (saved) { this.riotTag = saved; this.validateTag(); }
  }
  saveTag(): void {
    if (!this.riotTag) return;
    localStorage.setItem('saved.riotTag.valorant', this.riotTag);
    import('sweetalert2').then(({ default: Swal }) => Swal.fire({ icon: 'success', title: 'บันทึกแล้ว', text: 'บันทึก Riot Tag สำหรับครั้งถัดไปเรียบร้อย' }));
  }

  addToCart(p: ProductOption): void {
    const found = this.cart.find(i => i.id === p.id);
    if (found) {
      found.qty += 1;
    } else {
      this.cart.push({ id: p.id, vp: p.vp, amount: p.amount, qty: 1 });
    }
  }

  inc(item: CartItem): void { item.qty += 1; }
  dec(item: CartItem): void { if (item.qty > 1) item.qty -= 1; else this.remove(item); }
  remove(item: CartItem): void { this.cart = this.cart.filter(i => i.id !== item.id); }
  clearCart(): void { this.cart = []; }

  get totalQty(): number { return this.cart.reduce((s, i) => s + i.qty, 0); }
  get totalAmount(): number { return this.cart.reduce((s, i) => s + i.qty * i.amount, 0); }

  choosePayment(id: 'promptpay' | 'truemoney'): void { this.selectedPayment = id; }

  checkout(): void {
    if (!this.cart.length || !this.selectedPayment || !this.isValidTag) return;
    const summary = `Riot Tag: ${this.riotTag} | ` + this.cart.map(i => `${i.vp}VP x${i.qty}`).join(', ');
    this.router.navigate(['/checkout'], {
      queryParams: {
        game: 'VALORANT ePIN',
        accountType: 'ePIN',
        accountValue: summary,
        amount: this.totalAmount,
        method: this.selectedPayment,
        origin: 'giftcard',
      },
    });
  }

  openLightbox(): void { if (this.guideImage) this.isLightboxOpen = true; }
  closeLightbox(): void { this.isLightboxOpen = false; }

  // --- In-page checkout wizard (cart -> method -> summary -> pay) ---
  step: 'cart' | 'method' | 'summary' | 'pay' = 'cart';
  methodFees: Record<'promptpay'|'truemoney', number> = { promptpay: 0, truemoney: 0.025 };
  acceptTerms = false;
  customerName = '';
  isPaying = false;
  isPaid = false;
  orderId = '';
  // TrueMoney specific
  truemoneyPhone = '0917171717';
  truemoneySlipData: string | null = null;
  truemoneySlipName = '';
  // Coupon
  couponCode = '';
  discountRate = 0; // 0 or .10 when HCI400
  couponApplied = false;
  couponError: string | null = null;
  // Pay image lightbox
  payQrUrl = 'https://scontent.fbkk29-1.fna.fbcdn.net/v/t1.15752-9/566538890_1130417712554071_1302665028930504060_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_ohc=XnLa62aA9CAQ7kNvwEEBiS3&_nc_oc=AdlxmdjWQ7W7K5CMMYEWZ-f2lmEXrAS10zf-FtDQC4IZXKD0FKNQ58QSZflA99nYq3nXHQXSQvPLk-fGOrYa-GTr&_nc_zt=23&_nc_ht=scontent.fbkk29-1.fna&oh=03_Q7cD3gGz-UDa2joAwcyiTBLY-9ivZAuNOsSMeKFzjE8-NK8bQg&oe=692856EE';
  isPayImageOpen = false;
  payImageSrc = '';

  get discountAmount(): number {
    const amt = Math.round((this.totalAmount * this.discountRate) * 100) / 100;
    return amt;
  }
  get baseAfterDiscount(): number { return Math.max(0, this.totalAmount - this.discountAmount); }
  get fee(): number {
    if (!this.selectedPayment) return 0;
    const rate = this.methodFees[this.selectedPayment] || 0;
    return Math.round(this.baseAfterDiscount * rate * 100) / 100;
  }
  get grandTotal(): number { return Math.round((this.baseAfterDiscount + this.fee) * 100) / 100; }

  goToMethod(): void { if (this.cart.length && this.isValidTag) this.step = 'method'; }
  proceedFromMethod(): void { if (this.selectedPayment) this.step = 'summary'; }
  backToCart(): void { this.step = 'cart'; }
  backToMethod(): void { this.step = 'method'; }
  proceedToPay(): void { if (this.acceptTerms && this.selectedPayment) this.step = 'pay'; }
  paymentImage(): string {
    // fallback icon (not used for PromptPay QR in pay step)
    return this.selectedPayment === 'truemoney'
      ? 'https://download-th.com/wp-content/uploads/2021/02/True-money.jpg'
      : 'https://download-th.com/wp-content/uploads/2023/02/ThaiQR.jpg';
  }
  onSlipSelected(ev: any): void {
    const file: File | undefined = ev?.target?.files?.[0];
    if (!file) { this.truemoneySlipData = null; this.truemoneySlipName = ''; return; }
    if (!file.type.startsWith('image/')) { return; }
    if (file.size > 8 * 1024 * 1024) { return; } // 8MB limit
    const reader = new FileReader();
    reader.onload = () => { this.truemoneySlipData = reader.result as string; this.truemoneySlipName = file.name; };
    reader.readAsDataURL(file);
  }
  applyCoupon(): void {
    const code = this.couponCode.trim().toUpperCase();
    if (!code) { this.discountRate = 0; this.couponApplied = false; this.couponError = null; return; }
    if (code === 'HCI400') {
      this.discountRate = 0.10;
      this.couponApplied = true;
      this.couponError = null;
    } else {
      this.discountRate = 0;
      this.couponApplied = false;
      this.couponError = 'โค้ดไม่ถูกต้อง';
    }
  }
  clearCoupon(): void {
    this.couponCode = '';
    this.discountRate = 0;
    this.couponApplied = false;
    this.couponError = null;
  }
  openPayImage(src: string): void { this.payImageSrc = src; this.isPayImageOpen = true; }
  closePayImage(): void { this.isPayImageOpen = false; }
  confirmPay(): void {
    if (this.isPaying || this.isPaid) return;
    if (this.selectedPayment === 'truemoney' && !this.truemoneySlipData) return;
    this.isPaying = true;
    setTimeout(() => {
      this.isPaying = false;
      this.isPaid = true;
      this.orderId = 'VLR' + Math.floor(100000 + Math.random()*900000);
      import('sweetalert2').then(({ default: Swal }) =>
        Swal.fire({ icon: 'success', title: 'ชำระเงินสำเร็จ', text: `เลขคำสั่งซื้อ ${this.orderId}` })
      );
      setTimeout(() => {
        this.clearCart();
        this.acceptTerms = false;
        this.selectedPayment = null;
        this.step = 'cart';
        this.isPaid = false;
        this.orderId = '';
        this.truemoneySlipData = null; this.truemoneySlipName = ''; this.customerName = '';
      }, 1200);
    }, 800);
  }
}
