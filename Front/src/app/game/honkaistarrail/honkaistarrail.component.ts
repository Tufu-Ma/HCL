import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-honkaistarrail',
  standalone: false,
  templateUrl: './honkaistarrail.component.html',
  styleUrl: './honkaistarrail.component.css'
})
export class HonkaistarrailComponent implements OnInit {
  constructor(private router: Router, private location: Location) {}
  uid = '';
  isValidUid = false;
  server: 'Asia' | 'America' | 'Europe' | 'HMT' = 'Asia';
  unit = 'Oneiric';
  selectedPayment: 'promptpay' | 'truemoney' | null = null;
  guideImage = '';
  isLightboxOpen = false;

  products = [
  { id: 'hsr-0060', value: '60 Oneiric Shard', amount: 26 },
  { id: 'hsr-0300p30', value: '300+30 Oneiric Shard', amount: 116 },
  { id: 'hsr-0980p110', value: '980+110 Oneiric Shard', amount: 349 },
  { id: 'hsr-1980p260', value: '1980+260 Oneiric Shard', amount: 709 },
  { id: 'hsr-3280p600', value: '3280+600 Oneiric Shard', amount: 1169 },
  { id: 'hsr-6480p1600', value: '6480+1600 Oneiric Shard', amount: 2179 },

  // แพ็กหลายชุด
  { id: 'hsr-6480p1600-x2', value: '6480+1600 Oneiric Shard x2 แพ็ก', amount: 4358 },
  { id: 'hsr-6480p1600-x3', value: '6480+1600 Oneiric Shard x3 แพ็ก', amount: 6537 },
  { id: 'hsr-6480p1600-x5', value: '6480+1600 Oneiric Shard x5 แพ็ก', amount: 10895 },
  { id: 'hsr-6480p1600-x10', value: '6480+1600 Oneiric Shard x10 แพ็ก', amount: 21790 },

  // Express Supply Pass
  { id: 'hsr-pass-1', value: 'Express Supply Pass (หากคงเหลือต่ำกว่า 180 วัน จะได้เป็น Oneiric)', amount: 116 },

  // ชุดเหมาทดลองทุกแพ็ก (ไม่รวม Pass)
  { id: 'hsr-pack-all', value: 'เหมาทุกแพ็คอย่างละครั้ง (ไม่รวม Express Supply Pass)', amount: 4548 }
];



  cart: { id: string; value: any; amount: number; qty: number }[] = [];

  paymentMethods = [
    { id: 'promptpay', name: 'PromptPay', icon: 'https://download-th.com/wp-content/uploads/2023/02/ThaiQR.jpg' },
    { id: 'truemoney', name: 'TrueMoney', icon: 'https://download-th.com/wp-content/uploads/2021/02/True-money.jpg' }
  ];

  validateUid(): void { this.isValidUid = /^\d{6,20}$/.test(this.uid.trim()); }
  ngOnInit(): void {
    const saved = localStorage.getItem('saved.uid.hsr');
    if (saved) { this.uid = saved; this.validateUid(); }
  }
  saveUid(): void {
    if (!this.uid) return;
    localStorage.setItem('saved.uid.hsr', this.uid);
    import('sweetalert2').then(({ default: Swal }) => Swal.fire({ icon: 'success', title: 'บันทึกแล้ว', text: 'บันทึก UID สำหรับครั้งถัดไปเรียบร้อย' }));
  }
  choosePayment(id: 'promptpay' | 'truemoney'): void { this.selectedPayment = id; }
  addToCart(p: any) { const f = this.cart.find(i => i.id === p.id); if (f) f.qty++; else this.cart.push({ id: p.id, value: p.value, amount: p.amount, qty: 1 }); }
  inc(it: any) { it.qty++; }
  dec(it: any) { if (it.qty > 1) it.qty--; else this.remove(it); }
  remove(it: any) { this.cart = this.cart.filter(x => x.id !== it.id); }
  clearCart() { this.cart = []; }
  get totalQty() { return this.cart.reduce((s, i) => s + i.qty, 0); }
  get totalAmount() { return this.cart.reduce((s, i) => s + i.qty * i.amount, 0); }
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

  goToMethod(): void { if (this.cart.length && this.isValidUid) this.step = 'method'; }
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

  checkout(): void {
    if (!this.cart.length || !this.selectedPayment || !this.isValidUid) return;
    const prefix = `UID: ${this.uid} (Server: ${this.server}) | `;
    // สำหรับ HSR ค่า value มีหน่วยครบอยู่แล้ว จึงไม่ต่อท้ายด้วย unit
    const summary = prefix + this.cart.map(i => `${i.value} x${i.qty}`).join(', ');
    this.router.navigate(['/checkout'], { queryParams: { game: 'HONKAI: STAR RAIL', accountType: 'UID/Server', accountValue: summary, amount: this.totalAmount, method: this.selectedPayment, origin: 'termgame' } });
  }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/termgame']);
    }
  }

  openLightbox(): void { if (this.guideImage) this.isLightboxOpen = true; }
  closeLightbox(): void { this.isLightboxOpen = false; }

  confirmPay(): void {
    if (this.isPaying || this.isPaid) return;
    if (this.selectedPayment === 'truemoney' && !this.truemoneySlipData) return;
    this.isPaying = true;
    setTimeout(() => {
      this.isPaying = false;
      this.isPaid = true;
      this.orderId = 'HSR' + Math.floor(100000 + Math.random()*900000);
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
}
