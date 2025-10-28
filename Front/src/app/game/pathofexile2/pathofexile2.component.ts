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
  unit = 'Points';
  guideImage = 'https://www.lnwtrue.com/_next/image?url=https%3A%2F%2Fmedia.lnwtrue.com%2Fimages%2Fuid%2Fpathofexile2%2FplhU2qGtyL2Pq3.webp&w=1200&q=75';
  isLightboxOpen = false;
  lightboxImage: string | null = null;
  promptPayQr = 'https://scontent.fbkk29-1.fna.fbcdn.net/v/t1.15752-9/566538890_1130417712554071_1302665028930504060_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_ohc=XnLa62aA9CAQ7kNvwEEBiS3&_nc_oc=AdlxmdjWQ7W7K5CMMYEWZ-f2lmEXrAS10zf-FtDQC4IZXKD0FKNQ58QSZflA99nYq3nXHQXSQvPLk-fGOrYa-GTr&_nc_zt=23&_nc_ht=scontent.fbkk29-1.fna&oh=03_Q7cD3gGz-UDa2joAwcyiTBLY-9ivZAuNOsSMeKFzjE8-NK8bQg&oe=692856EE';
  
  products = [
  { id: 'poe-pt50', value: '50 แต้ม', amount: 129 },
  { id: 'poe-pt100', value: '100 แต้ม', amount: 239 },
  { id: 'poe-pt200', value: '200 แต้ม', amount: 479 },
  { id: 'poe-pack798', value: 'แพ็กตัวเกม Early Access 798 บาท', amount: 729 },
  { id: 'poe-pack1596', value: 'แพ็กตัวเกม Early Access 1596 บาท', amount: 1440 },
  { id: 'poe-pack2394', value: 'แพ็กตัวเกม Early Access 2394 บาท', amount: 2199 }
];



  cart: { id: string; value: any; amount: number; qty: number }[] = [];
  selectedPayment: 'promptpay' | 'truemoney' | null = null;
  rgLink = '';
  isValidLink = false;
  validateLink() { try { const u = new URL(this.rgLink); this.isValidLink = u.protocol.startsWith('http'); } catch { this.isValidLink = false; } }
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

  goToMethod(): void { if (this.cart.length && this.isValidLink) this.step = 'method'; }
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
      this.orderId = 'POE' + Math.floor(100000 + Math.random()*900000);
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
