import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderNavbarComponent } from '../../format/header-navbar/header-navbar.component';

interface ProductOption {
  id: string;
  value: number; // RP
  amount: number;
  tag?: 'ขายดี' | 'คุ้มค่า' | 'ใหม่';
}

interface CartItem {
  id: string;
  value: number; // RP
  amount: number;
  qty: number;
}

@Component({
  selector: 'app-lolpc',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderNavbarComponent],
  templateUrl: './lolpc.component.html',
  styleUrl: './lolpc.component.css'
})
export class LolpcComponent implements OnInit {
  constructor(private router: Router) {}
  unit = 'RP';
  guideImage = 'https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/566551340_1921686298409702_2169864257396934957_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_ohc=iNTdM3ZTUYoQ7kNvwFa2ket&_nc_oc=AdkTqLn-CySsfTfbwm2JHHPwn9h7DKV6NE7uw3is8LA4FortHukROAH0Hsfq1w0F1ZjJhlQBEY7k4aLD85UUKsEW&_nc_zt=23&_nc_ht=scontent.fbkk29-6.fna&oh=03_Q7cD3gG70pA3JTX44Z49K9Kdfp9UXgpY2j0do2vvwfA5DDp9Pg&oe=69283EF3';
  isLightboxOpen = false;
  lightboxImage: string | null = null;
  promptPayQr = 'https://scontent.fbkk29-1.fna.fbcdn.net/v/t1.15752-9/566538890_1130417712554071_1302665028930504060_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_ohc=XnLa62aA9CAQ7kNvwEEBiS3&_nc_oc=AdlxmdjWQ7W7K5CMMYEWZ-f2lmEXrAS10zf-FtDQC4IZXKD0FKNQ58QSZflA99nYq3nXHQXSQvPLk-fGOrYa-GTr&_nc_zt=23&_nc_ht=scontent.fbkk29-1.fna&oh=03_Q7cD3gGz-UDa2joAwcyiTBLY-9ivZAuNOsSMeKFzjE8-NK8bQg&oe=692856EE';

  products: ProductOption[] = [
  { id: 'rp-0575', value: 575, amount: 125 },
  { id: 'rp-1380', value: 1380, amount: 279 },
  { id: 'rp-1955', value: 1955, amount: 404 },
  { id: 'rp-2800', value: 2800, amount: 538 },
  { id: 'rp-3375', value: 3375, amount: 663 },
  { id: 'rp-3950', value: 3950, amount: 788 },
  { id: 'rp-4500', value: 4500, amount: 855 },
  { id: 'rp-5075', value: 5075, amount: 980 },
  { id: 'rp-5880', value: 5880, amount: 1134 },
  { id: 'rp-6500', value: 6500, amount: 1200 },
  { id: 'rp-7075', value: 7075, amount: 1325 },
  { id: 'rp-7880', value: 7880, amount: 1479 },
  { id: 'rp-9300', value: 9300, amount: 1738 },
  { id: 'rp-11000', value: 11000, amount: 2055 },
  { id: 'rp-13500', value: 13500, amount: 2448 },
  { id: 'rp-14880', value: 14880, amount: 2727 },
  { id: 'rp-16300', value: 16300, amount: 2986 },
  { id: 'rp-18000', value: 18000, amount: 3303 },
  { id: 'rp-20000', value: 20000, amount: 3648 },
  { id: 'rp-27000', value: 27000, amount: 4896 },
  { id: 'rp-33500', value: 33500, amount: 6096 },
  { id: 'rp-59075', value: 59075, amount: 10772 },
];

  cart: CartItem[] = [];
  selectedPayment: 'promptpay' | 'truemoney' | null = null;

  riotTag = '';
  isValidTag = false;
  validateTag(): void {
    const pattern = /^[a-zA-Z0-9]{3,16}#[a-zA-Z0-9]{3,5}$/;
    this.isValidTag = pattern.test(this.riotTag.trim());
  }
  ngOnInit(): void {
    const saved = localStorage.getItem('saved.riotTag.lolpc');
    if (saved) { this.riotTag = saved; this.validateTag(); }
  }
  saveTag(): void {
    if (!this.riotTag) return;
    localStorage.setItem('saved.riotTag.lolpc', this.riotTag);
    import('sweetalert2').then(({ default: Swal }) => Swal.fire({ icon: 'success', title: 'บันทึกแล้ว', text: 'บันทึก Riot Tag สำหรับครั้งถัดไปเรียบร้อย' }));
  }

  addToCart(p: ProductOption): void {
    const f = this.cart.find(i => i.id === p.id);
    if (f) f.qty += 1; else this.cart.push({ id: p.id, value: p.value, amount: p.amount, qty: 1 });
  }
  inc(it: CartItem): void { it.qty += 1; }
  dec(it: CartItem): void { if (it.qty > 1) it.qty -= 1; else this.remove(it); }
  remove(it: CartItem): void { this.cart = this.cart.filter(x => x.id !== it.id); }
  clearCart(): void { this.cart = []; }

  get totalQty(): number { return this.cart.reduce((s, i) => s + i.qty, 0); }
  get totalAmount(): number { return this.cart.reduce((s, i) => s + i.qty * i.amount, 0); }

  choosePayment(id: 'promptpay' | 'truemoney'): void { this.selectedPayment = id; }

  // --- In-page wizard (Cart -> Method -> Summary -> Pay)
  step: 'cart' | 'method' | 'summary' | 'pay' = 'cart';
  methodFees: Record<'promptpay'|'truemoney', number> = { promptpay: 0, truemoney: 0.025 };
  acceptTerms = false;
  // Coupon
  couponCode = '';
  discountRate = 0;
  couponApplied = false;
  couponError: string | null = null;
  // TrueMoney
  truemoneyPhone = '0917171717';
  truemoneySlipData: string | null = null;
  truemoneySlipName = '';
  // Pay state
  isPaying = false;
  isPaid = false;
  orderId = '';

  get discountAmount(): number { return Math.round((this.totalAmount * this.discountRate) * 100) / 100; }
  get baseAfterDiscount(): number { return Math.max(0, this.totalAmount - this.discountAmount); }
  get fee(): number { if (!this.selectedPayment) return 0; const r = this.methodFees[this.selectedPayment] || 0; return Math.round(this.baseAfterDiscount * r * 100) / 100; }
  get grandTotal(): number { return Math.round((this.baseAfterDiscount + this.fee) * 100) / 100; }

  goToMethod(): void { if (this.cart.length && this.isValidTag) this.step = 'method'; }
  proceedFromMethod(): void { if (this.selectedPayment) this.step = 'summary'; }
  backToCart(): void { this.step = 'cart'; }
  backToMethod(): void { this.step = 'method'; }
  proceedToPay(): void { if (this.acceptTerms && this.selectedPayment) this.step = 'pay'; }

  onSlipSelected(ev: any): void {
    const file: File | undefined = ev?.target?.files?.[0];
    if (!file) { this.truemoneySlipData = null; this.truemoneySlipName = ''; return; }
    if (!file.type.startsWith('image/')) return;
    if (file.size > 8 * 1024 * 1024) return; // 8MB
    const reader = new FileReader();
    reader.onload = () => { this.truemoneySlipData = reader.result as string; this.truemoneySlipName = file.name; };
    reader.readAsDataURL(file);
  }

  applyCoupon(): void {
    const code = this.couponCode.trim().toUpperCase();
    if (!code) { this.discountRate = 0; this.couponApplied = false; this.couponError = null; return; }
    if (code === 'HCI400') { this.discountRate = 0.10; this.couponApplied = true; this.couponError = null; }
    else { this.discountRate = 0; this.couponApplied = false; this.couponError = 'โค้ดไม่ถูกต้อง'; }
  }
  clearCoupon(): void { this.couponCode = ''; this.discountRate = 0; this.couponApplied = false; this.couponError = null; }

  confirmPay(): void {
    if (this.isPaying || this.isPaid) return;
    if (this.selectedPayment === 'truemoney' && !this.truemoneySlipData) return;
    this.isPaying = true;
    setTimeout(() => {
      this.isPaying = false;
      this.isPaid = true;
      this.orderId = 'LOL' + Math.floor(100000 + Math.random()*900000);
      import('sweetalert2').then(({ default: Swal }) =>
        Swal.fire({ icon: 'success', title: 'ชำระเงินสำเร็จ', text: `เลขคำสั่งซื้อ ${this.orderId}` })
      );
      setTimeout(() => {
        this.clearCart();
        this.acceptTerms = false; this.selectedPayment = null; this.step = 'cart'; this.isPaid = false; this.orderId = '';
        this.truemoneySlipData = null; this.truemoneySlipName = ''; this.couponCode = ''; this.discountRate = 0; this.couponApplied = false; this.couponError = null;
      }, 1000);
    }, 800);
  }

  openLightbox(src?: string): void {
    if (src) { this.lightboxImage = src; this.isLightboxOpen = true; return; }
    if (this.guideImage) { this.lightboxImage = this.guideImage; this.isLightboxOpen = true; }
  }
  closeLightbox(): void { this.isLightboxOpen = false; this.lightboxImage = null; }

}
