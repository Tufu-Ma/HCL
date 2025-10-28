import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teamfight-tactic',
  standalone: false,
  templateUrl: './teamfight-tactic.component.html',
  styleUrl: './teamfight-tactic.component.css'
})
export class TeamfightTacticComponent implements OnInit {
  constructor(private router: Router) {}
  unit = 'Coins';
  guideImage = 'https://scontent.fbkk29-4.fna.fbcdn.net/v/t1.15752-9/557449036_755508104204292_5593963013011302835_n.png?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_ohc=qNV2qCjxFoMQ7kNvwE22jCY&_nc_oc=Admk98JVwJa4sXMIdgJ7uUCCQ-wJ4ztFD_V2BxNlhf7EFoyFN1IgCI6MLWA8f27b47U0mpwn48k6cID6ydDqRTpz&_nc_zt=23&_nc_ht=scontent.fbkk29-4.fna&oh=03_Q7cD3gFCExYCGFtXI5HDL4iq6lRX-h3JLhBpLE7Jn-EQ7gQWaA&oe=69283713';
  isLightboxOpen = false;
  lightboxImage: string | null = null;
  promptPayQr = 'https://scontent.fbkk29-1.fna.fbcdn.net/v/t1.15752-9/566538890_1130417712554071_1302665028930504060_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_ohc=XnLa62aA9CAQ7kNvwEEBiS3&_nc_oc=AdlxmdjWQ7W7K5CMMYEWZ-f2lmEXrAS10zf-FtDQC4IZXKD0FKNQ58QSZflA99nYq3nXHQXSQvPLk-fGOrYa-GTr&_nc_zt=23&_nc_ht=scontent.fbkk29-1.fna&oh=03_Q7cD3gGz-UDa2joAwcyiTBLY-9ivZAuNOsSMeKFzjE8-NK8bQg&oe=692856EE';
  products = [
    { id: 'tft-0300', value: 300, amount: 99 },
    { id: 'tft-0700', value: 700, amount: 199 },
    { id: 'tft-1500', value: 1500, amount: 399 },
    { id: 'tft-3200', value: 3200, amount: 799 },
    { id: 'tft-6600', value: 6600, amount: 1599 },
  ];
  cart: { id: string; value: any; amount: number; qty: number }[] = [];
  selectedPayment: 'promptpay' | 'truemoney' | null = null;
  riotTag = '';
  isValidTag = false;
  validateTag() { const p = /^[a-zA-Z0-9]{3,16}#[a-zA-Z0-9]{3,5}$/; this.isValidTag = p.test(this.riotTag.trim()); }
  ngOnInit(): void {
    const saved = localStorage.getItem('saved.riotTag.tft');
    if (saved) { this.riotTag = saved; this.validateTag(); }
  }
  saveTag(): void {
    if (!this.riotTag) return;
    localStorage.setItem('saved.riotTag.tft', this.riotTag);
    import('sweetalert2').then(({ default: Swal }) => Swal.fire({ icon: 'success', title: 'บันทึกแล้ว', text: 'บันทึก Riot Tag สำหรับครั้งถัดไปเรียบร้อย' }));
  }
  addToCart(p: any) { const f = this.cart.find(i => i.id === p.id); if (f) f.qty++; else this.cart.push({ id: p.id, value: p.value, amount: p.amount, qty: 1 }); }
  inc(it: any) { it.qty++; }
  dec(it: any) { if (it.qty > 1) it.qty--; else this.remove(it); }
  remove(it: any) { this.cart = this.cart.filter(x => x.id !== it.id); }
  clearCart() { this.cart = []; }
  get totalQty() { return this.cart.reduce((s, i) => s + i.qty, 0); }
  get totalAmount() { return this.cart.reduce((s, i) => s + i.qty * i.amount, 0); }
  choosePayment(id: 'promptpay' | 'truemoney') { this.selectedPayment = id; }
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
      this.orderId = 'TFT' + Math.floor(100000 + Math.random()*900000);
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
