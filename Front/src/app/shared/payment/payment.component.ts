import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // ข้อมูลโปรโมชั่นที่เลือกซื้อ
  selectedPromotion: any = null;
  
  // ข้อมูลการชำระเงิน
  paymentData = {
    paymentMethod: 'credit-card'
  };

  // ข้อมูลโปรโมชั่นทั้งหมด (เหมือนกับ promotion.component.ts)
  promotions = [
    {
      id: 1,
      title: 'โปรโมชั่น Valorant',
      subtitle: '🔥 ลดราคา 55% 🔥',
      imageUrl: 'assets/valo.jpg',
      discount: '-55%',
      price: '540 บาท',
      originalPrice: '1,200 บาท',
      bonusItems: ['4,000 VP (แต่ Skin ที่อยากได้ราคา 8,000)', 'Premium Weapon Skins x4 (แต่ Aim ยังขยะ)', 'Battle Pass Complete (ที่ไม่มีเวลาเล่น)', 'Agent Unlock x2 (แต่เล่นได้แค่ Sage)'],
      features: [
        'Aim ห่วยขึ้น 500% หลังซื้อ Skin เพราะเครียดว่าเสียเงิน',
        'Bottom Frag ทุกเกมแต่ Skin สวยที่สุดในทีม',
        'Flash ตัวเองมากกว่าศัตรู และโดนทีมด่าทุกรอบ',
        'Clutch ไม่ได้เลยแต่ Toxic ได้อันดับหนึ่งของเซิร์ฟเวอร์'
      ]
    },
    {
      id: 2,
      title: 'โปรโมชั่น League of Legends PC',
      subtitle: '🔥 ลดราคา 45% 🔥',
      imageUrl: 'assets/lol pc.jpg',
      discount: '-45%',
      price: '550 บาท',
      originalPrice: '1,000 บาท',
      bonusItems: ['3,500 RP (แต่ใช้ซื้อ Skin จนหมดใน 2 วัน)', 'Ultimate Skin (ที่ไม่ใช่ของ Main)', 'Championship Bundle (แต่ไม่ถึงระดับ)', 'Emote Package (ที่ใช้แต่ BM)'],
      features: [
        'Queue Ranked 45 นาที เจอแต่ One-Trick Pony ที่เล่นแค่ตัวเดียว',
        'เล่น Jungle แต่ Laner ไม่ยอมช่วย Ward แล้วโทษ Jungler',
        'Pentakill ได้ 1 ครั้งในชีวิต แต่เป็น Kill Steal จาก Support',
        'ปีนแรงค์ 3 เดือน ขึ้นได้แค่ 1 Tier แล้วตกลงมาเหมือนเดิม'
      ]
    },
    {
      id: 3,
      title: 'โปรโมชั่น League of Legends: Wild Rift',
      subtitle: '🔥 ลดราคา 40% 🔥',
      imageUrl: 'assets/lol.jpg',
      discount: '-40%',
      price: '480 บาท',
      originalPrice: '800 บาท',
      bonusItems: ['2,500 Wild Cores (แต่ใช้ซื้อของแพงจนหมดในวันเดียว)', 'Legendary Skin (แต่โดนเนิร์ฟในแพทช์ถัดไป)', 'Champion Unlock x5 (ที่คุณไม่เคยเล่น)', 'Ranked Boost 7 วัน (แต่เจอแต่ทีมขาด)'],
      features: [
        'Queue Ranked 30 นาทีต่อเกม เจอแต่ Smurf Account ทุกเกม',
        'เล่น Support สุดมือแต่ ADC ป้อนศัตรูจนอยากลบเกม',
        'Pentakill ได้ครั้งเดียวในชีวิต Screenshot เก็บไว้อวดลูกหลาน',
        'โดนแบน Champion ที่เก่งเพียงตัวเดียว กลายเป็นคนเล่นห่วย'
      ]
    },
    {
      id: 4,
      title: 'โปรโมชั่น Teamfight Tactics',
      subtitle: '🔥 ลดราคา 35% 🔥',
      imageUrl: 'assets/teamfight.jpg',
      discount: '-35%',
      price: '455 บาท',
      originalPrice: '700 บาท',
      bonusItems: ['2,200 RP (แต่ Little Legends ที่อยากได้แพงกว่า)', 'Little Legends x3 (ที่ดูน่ารักแต่ไม่ช่วยให้ชนะ)', 'Arena Skins (ที่ใช้แล้วกิ๊งขึ้น)', 'Pass+ Premium (ที่ไม่มีเวลาทำ Mission)'],
      features: [
        'RNG ซวยขึ้น 500% Shop ไม่ขาย Champion ที่ต้องการเลย',
        'High Roll ได้แค่ใน Normal Games พอเข้า Ranked กลายเป็นขยะ',
        '3-Star carry ได้ที่ตำแหน่งสุดท้าย แต่ติดอันดับ 8',
        'รู้ Meta ทุกแพทช์แต่ยังติด Gold ไม่ขึ้นเลย'
      ]
    },
    {
      id: 5,
      title: 'โปรโมชั่น 2XKO',
      subtitle: '🔥 ลดราคา 50% 🔥',
      imageUrl: 'assets/2xko.png',
      discount: '-50%',
      price: '400 บาท',
      originalPrice: '800 บาท',
      bonusItems: ['2,400 Riot Points (แต่ Skin ที่เท่ราคา 5,000)', 'Fighter Pass (ที่ทำไม่ทันหมดเขต)', 'Premium Fighter Skins x3 (แต่โคมโบยังทำไม่ได้)', 'Training Mode+ (ที่ไม่ใช้เลย)'],
      features: [
        'เรียนรู้ Combo 500 ชุด แต่ในเกมจริงใช้ได้แค่ปุ่ม Punch',
        'เจอ Pro Player ในแรงค์ต่ำๆ มาซ้อมมือใหม่',
        'Input Lag โทษทุกครั้งที่แพ้ แต่จริงๆ คือมือช้า',
        'Perfect ใน Training แต่จริงๆ แพ้เด็ก 10 ขวบได้'
      ]
    },
    {
      id: 6,
      title: 'โปรโมชั่น Seven Knights: Rebirth',
      subtitle: '🔥 ลดราคา 55% 🔥',
      imageUrl: 'assets/7k.jpg',
      discount: '-55%',
      price: '540 บาท',
      originalPrice: '1,200 บาท',
      bonusItems: ['4,500 Rubies (แต่ Gacha Rate 0.1%)', 'Legendary Heroes x5 (ที่ Outdated แล้ว)', 'Equipment Set (ที่ Enhance แตกทุกครั้ง)', 'Premium Pass 60 วัน (ที่ลืมเข้าเล่น)'],
      features: [
        'Gacha ได้ Legendary แต่เป็นตัวที่แย่ที่สุดในเกม',
        'Enhance +15 ใช้เงิน 50,000 บาท แต่ยังติด +10',
        'Guild War เข้าร่วมแค่ไม่กี่ครั้งก็โดนไล่ออก',
        'Meta เปลี่ยนทุกสัปดาห์ Heroes ที่มีกลายเป็นขยะ'
      ]
    },
    {
      id: 7,
      title: 'โปรโมชั่น Path of Exile 2',
      subtitle: '🔥 ลดราคา 40% 🔥',
      imageUrl: 'assets/path of ex.jpg',
      discount: '-40%',
      price: '900 บาท',
      originalPrice: '1,500 บาท',
      bonusItems: ['5,000 Points (แต่ของที่เท่าราคาแพงเกิน)', 'Supporter Pack (ที่มี Cosmetic อย่างเดียว)', 'Premium MTX Bundle (ที่ไม่ช่วยให้เก่งขึ้น)', 'Early Access (ที่เต็มไปด้วย Bug)'],
      features: [
        'เกมฟรี แต่ Stash Tab แพงกว่าซื้อเกมใหม่',
        'Build Guide ดูไป 50 ชั่วโมง แต่เล่นจริงตายใน Act 1',
        'RNG ซวยขึ้น 1000% ไม่ Drop ของดีเลยสักชิ้น',
        'League ใหม่มาเมื่อไหร่ ต้องเริ่มใหม่หมดทุกครั้ง'
      ]
    },
    {
      id: 8,
      title: 'โปรโมชั่น Marvel Rivals',
      subtitle: '🔥 ลดราคา 45% 🔥',
      imageUrl: 'assets/marvel.jpg',
      discount: '-45%',
      price: '550 บาท',
      originalPrice: '1,000 บาท',
      bonusItems: ['3,200 Units (แต่ Hero ที่อยากเล่นล็อคอยู่)', 'Hero Unlock Pack (แต่เป็น Support ที่ไม่อยากเล่น)', 'Premium Skins x4 (แต่ไม่ช่วยให้เล่นเก่งขึ้น)', 'Battle Pass Elite (ที่ไม่มีเวลาทำ)'],
      features: [
        'เลือก DPS แต่ทีมเลือก DPS หมด ต้องเล่น Tank โดยไม่เต็มใจ',
        'Ultimate ได้ POTG แต่เป็นเพราะทีมเซ็ตให้หมดแล้ว',
        'Main ตัวเดียว แต่โดนแบนหรือเลือกไปเสียก่อน',
        'Teamwork ดีแต่เจอ Solo Queue Heroes ที่เล่นแยกไปคนละทิศ'
      ]
    },
    {
      id: 9,
      title: 'โปรโมชั่น Pokémon Unite',
      subtitle: '🔥 ลดราคา 35% 🔥',
      imageUrl: 'assets/pokemon.jpeg',
      discount: '-35%',
      price: '420 บาท',
      originalPrice: '650 บาท',
      bonusItems: ['1,800 Aeos Gems (แต่ของที่อยากได้แพงเกิน)', 'Holowear Set (แต่ใส่แล้วเล่นแย่ลง)', 'Battle Pass Premium (ที่ทำไม่ทันหมดเขต)', 'Pokemon License x3 (แต่เลือกได้แต่ตัวห่วย)'],
      features: [
        'ทีมเลือกแต่ Attacker 4 ตัว ไม่มี Tank กับ Support เลย',
        'Zapdos Fight แพ้แล้วเกมจบ ไม่ว่าจะเหนือกว่ายังไงก็ตาม',
        'Unite Move กดพลาด 90% ของเวลา เพราะมือสั่นตอนตื่นเต้น',
        'เด็กนักเรียน ป.4 เล่นเก่งกว่าคุณ และมาด่าอีกต่างหาก'
      ]
    },
    {
      id: 10,
      title: 'โปรโมชั่น Arena Breakout',
      subtitle: '🔥 ลดราคา 50% 🔥',
      imageUrl: 'assets/breakout.jpg',
      discount: '-50%',
      price: '450 บาท',
      originalPrice: '900 บาท',
      bonusItems: ['2,800 Koen (แต่อุปกรณ์ดีๆ ราคาแพงเกิน)', 'Premium Weapon Pack (แต่แพ้ก่อนใช้ได้)', 'Insurance Premium (ที่ไม่คุ้มค่าเงินที่จ่าย)', 'Stash Upgrade (ที่เก็บของเยอะแต่ไม่มีของดี)'],
      features: [
        'เสียอุปกรณ์แพงทุกครั้งที่ตาย แล้วกลับไปใช้ของขยะ',
        'Rat Play 90% ของเวลา แต่ก็ยังโดน Chad ฆ่าได้',
        'เก็บ Loot ดีๆ ได้ แต่ Exit ไม่ออกเพราะโดนแอบซุ่ม',
        'รู้แผนที่หมด แต่ยังโดน Camper ฆ่าที่มุมเดิมทุกครั้ง'
      ]
    },
    {
      id: 11,
      title: 'โปรโมชั่น Delta Force Steam PC',
      subtitle: '🔥 ลดราคา 60% 🔥',
      imageUrl: 'assets/delta.png',
      discount: '-60%',
      price: '320 บาท',
      originalPrice: '800 บาท',
      bonusItems: ['3,000 Credits (แต่ Weapon ดีๆ ราคาแพงเกิน)', 'Military Weapon Skins x5 (แต่ไม่ช่วยเล่นเก่งขึ้น)', 'Battle Pass Premium (ที่ไม่มีเวลาเล่น)', 'Tactical Gear Set (ที่ดูเท่แต่ใช้ไม่เป็น)'],
      features: [
        'Recoil Control ไม่เป็น ยิงไปฟ้าทุกครั้ง',
        'เจอ Cheater ทุก 3 เกม แต่ Report ไปก็ไม่มีใครแบน',
        'Teamwork ดีแต่เพื่อนไม่มี Mic หรือไม่พูดภาษาเดียวกัน',
        'สายลับแต่เดินเสียงดังกว่าช้างป่าในป่าใหญ่'
      ]
    },
    {
      id: 12,
      title: 'โปรโมชั่น Honkai: Star Rail',
      subtitle: '🔥 ลดราคา 40% 🔥',
      imageUrl: 'assets/star rail.jpg',
      discount: '-40%',
      price: '660 บาท',
      originalPrice: '1,100 บาท',
      bonusItems: ['4,200 Stellar Jade (แต่ Pity Counter รีเซ็ตทุกครั้ง)', '5-Star Character (ที่ไม่ใช่ตัวที่อยาก)', 'Light Cone Set (ที่ไม่เข้ากับ Character)', 'Express Pass (ที่หมดอายุเร็วเกิน)'],
      features: [
        'Gacha ไป 89 Pull ก่อนได้ 5-Star แล้วเป็นตัวที่ไม่ต้องการ',
        'Meta Team Build ใช้เงิน 100,000 บาทแต่ยังแพ้ F2P',
        'Daily Quest ทำครบทุกวันแต่ยัง Jade ไม่พอซื้ออะไร',
        'Story Mode เผลอกด Skip ตอนสำคัญ กลับไปดูไม่ได้'
      ]
    },
    {
      id: 13,
      title: 'โปรโมชั่น Genshin Impact',
      subtitle: '🔥 ลดราคา 45% 🔥',
      imageUrl: 'assets/genshin.jpeg',
      discount: '-45%',
      price: '880 บาท',
      originalPrice: '1,600 บาท',
      bonusItems: ['6,480 Primogems (แต่ได้แค่ Qiqi C6)', 'Character Materials Pack (แต่ไม่ใช่ของ Character ที่มี)', 'Weapon Enhancement Ore (ที่ใช้หมดแต่ยัง +15 ไม่ได้)', 'Resin Refresh x30 (ที่ใช้หมดใน 2 วัน)'],
      features: [
        'Artifact Farming 6 เดือน ยังไม่ได้ชิ้นที่ต้องการ',
        'Pity 90 ทุกครั้งแล้วเจอ Qiqi เป็น 50/50 Loss',
        'Spiral Abyss 36 Star ได้ครั้งเดียวแล้วไม่เคยอีก',
        'Event พลาดไปเยอะ เพราะลืมเล่นแล้วหมดเขตไปแล้ว'
      ]
    },
    {
      id: 14,
      title: 'โปรโมชั่น Zenless Zone Zero',
      subtitle: '🔥 ลดราคา 50% 🔥',
      imageUrl: 'assets/zenless.jpg',
      discount: '-50%',
      price: '600 บาท',
      originalPrice: '1,200 บาท',
      bonusItems: ['4,800 Polychrome (แต่ได้ S-Rank ที่ไม่ต้องการ)', 'Agent Materials Pack (ที่ใช้ไม่ได้เพราะไม่มี Agent นั้น)', 'W-Engine Bundle (ที่ไม่เข้ากับ Agent ที่มี)', 'Battery Charge x50 (ที่ใช้หมดใน 3 วัน)'],
      features: [
        'Gacha Simulator มากกว่าเล่นเกมจริง ได้แต่ A-Rank',
        'Combat ดีแต่ไม่รู้ Combo กดปุ่มเดียวตลอด',
        'Story ดีมากแต่เผลอกด Skip เพราะอ่านไม่ทัน',
        'Meta Team ต้องใช้เงิน 200,000 บาท แต่ยังไม่มีครบ'
      ]
    },
    {
      id: 15,
      title: 'โปรโมชั่น Wuthering Waves',
      subtitle: '🔥 ลดราคา 40% 🔥',
      imageUrl: 'assets/Wuthering Waves.jpg',
      discount: '-40%',
      price: '600 บาท',
      originalPrice: '1,000 บาท',
      bonusItems: ['3,600 Astrite (แต่ Pity System โหดกว่า Genshin)', 'Echo Enhancement Pack (แต่ RNG ให้ Stats ขยะ)', '5-Star Weapon Materials (แต่ไม่มี 5-Star Weapon)', 'Waveplates Refill x20 (ที่ใช้หมดใน 1 วัน)'],
      features: [
        'Copy Genshin แต่ทำได้แย่กว่าทุกด้าน',
        'Combat System ซับซ้อนแต่ AI ทำได้ดีกว่าเรา',
        'Open World ใหญ่แต่ว่างเปล่าไม่มีอะไรทำ',
        'Performance Optimization แย่ มือถือร้อนจนแบตเตอรี่บวม'
      ]
    }
  ];

  ngOnInit(): void {
    // เลื่อนไปบนสุดเมื่อโหลดหน้า
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // รับ promotion id จาก URL parameter ถ้ามี
    const promotionId = this.route.snapshot.queryParams['promotionId'];
    if (promotionId) {
      this.selectedPromotion = this.promotions.find(p => p.id === parseInt(promotionId));
    }
  }

  // เมธอดสำหรับการชำระเงิน
  onPayment(): void {
    if (this.validateForm()) {
      console.log('ข้อมูลการชำระเงิน:', this.paymentData);
      console.log('โปรโมชั่นที่ซื้อ:', this.selectedPromotion);
      
      // แสดง alert ว่าชำระเงินสำเร็จ
      alert(`🎉 การสั่งซื้อสำเร็จแล้ว!

📦 โปรโมชั่นที่สั่งซื้อ: ${this.selectedPromotion?.title}
💰 จำนวนเงินที่ชำระ: ${this.selectedPromotion?.price}

✅ รหัสการสั่งซื้อ: GM${Date.now().toString().slice(-6)}
💵 วิธีการชำระเงิน: ${this.getPaymentMethodName()}

🙏🏻 ขอบคุณที่ใช้บริการ!`);
      
      // กลับไปหน้าโปรโมชั่น (Router จะเลื่อนไปบนสุดเองแล้ว)
      this.router.navigate(['/promotion']);
    }
  }

  // ตรวจสอบความถูกต้องของฟอร์ม
  validateForm(): boolean {
    if (!this.paymentData.paymentMethod) {
      alert('กรุณาเลือกวิธีการชำระเงิน');
      return false;
    }
    return true;
  }

  // กลับไปหน้าก่อนหน้า
  goBack(): void {
    this.router.navigate(['/promotion']);
  }

  // คำนวณเงินที่ประหยัดได้
  calculateSavings(originalPrice: string, currentPrice: string): number {
    const original = parseInt(originalPrice.replace(/[^0-9]/g, ''));
    const current = parseInt(currentPrice.replace(/[^0-9]/g, ''));
    return original - current;
  }

  // แปลงชื่อวิธีการชำระเงิน
  getPaymentMethodName(): string {
    switch(this.paymentData.paymentMethod) {
      case 'credit-card': return 'บัตรเครดิต/เดบิต';
      case 'bank-transfer': return 'โอนเงินผ่านธนาคาร';
      case 'e-wallet': return 'E-Wallet (TrueMoney, PromptPay)';
      default: return 'ไม่ระบุ';
    }
  }
}