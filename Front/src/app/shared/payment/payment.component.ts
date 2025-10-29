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
    customerName: '',
    email: '',
    phone: '',
    paymentMethod: 'credit-card'
  };

  // ข้อมูลโปรโมชั่นทั้งหมด (เหมือนกับ promotion.component.ts)
  promotions = [
    {
      id: 1,
      title: 'โปรโมชั่น Valorant',
      subtitle: '🎯 ลดราคา 55% + Premium Skins 🎯',
      description: 'เซ็ตเอเจ้นท์! เติม 1,200 บาท ได้ 4,000 VP + Premium Weapon Skins + Battle Pass! ดีลสุดพิเศษสำหรับนักยิงมืออาชีพที่ต้องการความเท่ห์และประสิทธิภาพสูงสุด',
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
      subtitle: '⚔️ ลดราคา 45% + RP โบนัส ⚔️',
      description: 'เซ็ต PC Master Race! เติม 1,000 บาท ได้ 3,500 RP + Ultimate Skin + Championship Bundle! สำหรับนักรบ Summoner\'s Rift ตัวจริงที่พร้อมพิสูจน์ตัวเองในระดับโลก',
      imageUrl: 'assets/lol pc.jpg',
      discount: '-45%',
      price: '550 บาท',
      originalPrice: '1,000 บาท',
      bonusItems: ['3,500 RP (แต่ใช้ซื้อ Skin จนหมดใน 2 วัน)', 'Ultimate Skin (ที่ไม่ใช่ของ Main)', 'Championship Bundle (แต่ไม่ถึงระดับ)', 'Emote Package (ที่ใช้แต่ BM)']
    },
    {
      id: 3,
      title: 'โปรโมชั่น League of Legends: Wild Rift',
      subtitle: '📱 ลดราคา 40% + Wild Cores โบนัส 📱',
      description: 'เซ็ตมือถือ! เติม 800 บาท ได้ 2,500 Wild Cores + Legendary Skin ฟรี! พร้อมของแถมมากมายสำหรับนักรบ Rift บนมือถือ ลิมิเต็ดไทม์เท่านั้น!',
      imageUrl: 'assets/lol.jpg',
      discount: '-40%',
      price: '480 บาท',
      originalPrice: '800 บาท',
      bonusItems: ['2,500 Wild Cores (แต่ใช้ซื้อของแพงจนหมดในวันเดียว)', 'Legendary Skin (แต่โดนเนิร์ฟในแพทช์ถัดไป)', 'Champion Unlock x5 (ที่คุณไม่เคยเล่น)', 'Ranked Boost 7 วัน (แต่เจอแต่ทีมขาด)']
    },
    {
      id: 4,
      title: 'โปรโมชั่น Teamfight Tactics',
      subtitle: '🎲 ลดราคา 35% + Little Legends โบนัส 🎲',
      description: 'เซ็ต Auto Battler! เติม 700 บาท ได้ 2,200 RP + Little Legends Bundle + Arena ฟรี! สำหรับนักเล่น TFT ที่ต้องการ Luck และ Strategy ระดับโปร',
      imageUrl: 'assets/teamfight.jpg',
      discount: '-35%',
      price: '455 บาท',
      originalPrice: '700 บาท',
      bonusItems: ['2,200 RP (แต่ Little Legends ที่อยากได้แพงกว่า)', 'Little Legends x3 (ที่ดูน่ารักแต่ไม่ช่วยให้ชนะ)', 'Arena Skins (ที่ใช้แล้วกิ๊งขึ้น)', 'Pass+ Premium (ที่ไม่มีเวลาทำ Mission)']
    },
    {
      id: 5,
      title: 'โปรโมชั่น 2XKO',
      subtitle: '🥊 ลดราคา 50% + Fighter Pass 🥊',
      description: 'เซ็ต Fighting Game! เติม 800 บาท ได้ 2,400 Riot Points + Fighter Pass Complete + Premium Skins! สำหรับนักสู้ตัวจริงที่พร้อมพิสูจน์ตัวเองในสังเวียนการต่อสู้',
      imageUrl: 'assets/2xko.png',
      discount: '-50%',
      price: '400 บาท',
      originalPrice: '800 บาท',
      bonusItems: ['2,400 Riot Points (แต่ Skin ที่เท่ราคา 5,000)', 'Fighter Pass (ที่ทำไม่ทันหมดเขต)', 'Premium Fighter Skins x3 (แต่โคมโบยังทำไม่ได้)', 'Training Mode+ (ที่ไม่ใช้เลย)']
    },
    {
      id: 6,
      title: 'โปรโมชั่น Seven Knights: Rebirth',
      subtitle: '⚔️ ลดราคา 55% + Rebirth Package ⚔️',
      description: 'เซ็ต Rebirth! เติม 1,200 บาท ได้ 4,500 Rubies + Legendary Heroes + Equipment Set! ดีลพิเศษสำหรับนักรบที่ต้องการเริ่มต้นใหม่ด้วยพลังที่แกร่งกว่าเดิม',
      imageUrl: 'assets/7k.jpg',
      discount: '-55%',
      price: '540 บาท',
      originalPrice: '1,200 บาท',
      bonusItems: ['4,500 Rubies (แต่ Gacha Rate 0.1%)', 'Legendary Heroes x5 (ที่ Outdated แล้ว)', 'Equipment Set (ที่ Enhance แตกทุกครั้ง)', 'Premium Pass 60 วัน (ที่ลืมเข้าเล่น)']
    },
    {
      id: 7,
      title: 'โปรโมชั่น Path of Exile 2',
      subtitle: '🔮 ลดราคา 40% + Supporter Pack 🔮',
      description: 'เซ็ต Exile! เติม 1,500 บาท ได้ 5,000 Points + Supporter Pack + MTX Bundle! สำหรับ Exile ตัวจริงที่พร้อมสำรวจโลกที่มืดมนและอันตรายที่สุด',
      imageUrl: 'assets/path of ex.jpg',
      discount: '-40%',
      price: '900 บาท',
      originalPrice: '1,500 บาท',
      bonusItems: ['5,000 Points (แต่ของที่เท่าราคาแพงเกิน)', 'Supporter Pack (ที่มี Cosmetic อย่างเดียว)', 'Premium MTX Bundle (ที่ไม่ช่วยให้เก่งขึ้น)', 'Early Access (ที่เต็มไปด้วย Bug)']
    },
    {
      id: 8,
      title: 'โปรโมชั่น Marvel Rivals',
      subtitle: '🦸 ลดราคา 45% + Hero Pack 🦸',
      description: 'เซ็ต Superhero! เติม 1,000 บาท ได้ 3,200 Units + Hero Unlock Pack + Premium Skins! สำหรับคนที่อยากเป็นฮีโร่แต่จบลงด้วยการเป็นตัวร้าย',
      imageUrl: 'assets/marvel.jpg',
      discount: '-45%',
      price: '550 บาท',
      originalPrice: '1,000 บาท',
      bonusItems: ['3,200 Units (แต่ Hero ที่อยากเล่นล็อคอยู่)', 'Hero Unlock Pack (แต่เป็น Support ที่ไม่อยากเล่น)', 'Premium Skins x4 (แต่ไม่ช่วยให้เล่นเก่งขึ้น)', 'Battle Pass Elite (ที่ไม่มีเวลาทำ)']
    },
    {
      id: 9,
      title: 'โปรโมชั่น Pokémon Unite',
      subtitle: '⚡ ลดราคา 35% + Holowear Set ⚡',
      description: 'เซ็ตโปเกม่อน! เติม 650 บาท ได้ 1,800 Aeos Gems + Holowear Set สุดน่ารัก! พร้อม Battle Pass Premium และ License ฟรี เหมาะสำหรับทรนเนอร์มือใหม่และเก่า',
      imageUrl: 'assets/pokemon.jpeg',
      discount: '-35%',
      price: '420 บาท',
      originalPrice: '650 บาท',
      bonusItems: ['1,800 Aeos Gems (แต่ของที่อยากได้แพงเกิน)', 'Holowear Set (แต่ใส่แล้วเล่นแย่ลง)', 'Battle Pass Premium (ที่ทำไม่ทันหมดเขต)', 'Pokemon License x3 (แต่เลือกได้แต่ตัวห่วย)']
    },
    {
      id: 10,
      title: 'โปรโมชั่น Arena Breakout',
      subtitle: '🔫 ลดราคา 50% + Tactical Pack 🔫',
      description: 'เซ็ต Tactical! เติม 900 บาท ได้ 2,800 Koen + Weapon Pack + Premium Account! สำหรับนักรบที่พร้อมเข้าสู่สนามรบที่โหดร้ายที่สุด',
      imageUrl: 'assets/breakout.jpg',
      discount: '-50%',
      price: '450 บาท',
      originalPrice: '900 บาท',
      bonusItems: ['2,800 Koen (แต่อุปกรณ์ดีๆ ราคาแพงเกิน)', 'Premium Weapon Pack (แต่แพ้ก่อนใช้ได้)', 'Insurance Premium (ที่ไม่คุ้มค่าเงินที่จ่าย)', 'Stash Upgrade (ที่เก็บของเยอะแต่ไม่มีของดี)']
    },
    {
      id: 11,
      title: 'โปรโมชั่น Delta Force Steam PC',
      subtitle: '🚁 ลดราคา 60% + Military Pack 🚁',
      description: 'เซ็ต Military! เติม 800 บาท ได้ 3,000 Credits + Weapon Skins + Battle Pass! ดีลสุดพิเศษสำหรับนักรบที่ต้องการความสมจริงและแอ็คชั่นระดับสูง',
      imageUrl: 'assets/delta.png',
      discount: '-60%',
      price: '320 บาท',
      originalPrice: '800 บาท',
      bonusItems: ['3,000 Credits (แต่ Weapon ดีๆ ราคาแพงเกิน)', 'Military Weapon Skins x5 (แต่ไม่ช่วยเล่นเก่งขึ้น)', 'Battle Pass Premium (ที่ไม่มีเวลาเล่น)', 'Tactical Gear Set (ที่ดูเท่แต่ใช้ไม่เป็น)']
    },
    {
      id: 12,
      title: 'โปรโมชั่น Honkai: Star Rail',
      subtitle: '🚂 ลดราคา 40% + Stellar Jade 🚂',
      description: 'เซ็ต Trailblazer! เติม 1,100 บาท ได้ 4,200 Stellar Jade + Character Pack + Light Cone! ดีลพิเศษสำหรับนักผจญภัยที่พร้อมสำรวจจักรวาล',
      imageUrl: 'assets/star rail.jpg',
      discount: '-40%',
      price: '660 บาท',
      originalPrice: '1,100 บาท',
      bonusItems: ['4,200 Stellar Jade (แต่ Pity Counter รีเซ็ตทุกครั้ง)', '5-Star Character (ที่ไม่ใช่ตัวที่อยาก)', 'Light Cone Set (ที่ไม่เข้ากับ Character)', 'Express Pass (ที่หมดอายุเร็วเกิน)']
    },
    {
      id: 13,
      title: 'โปรโมชั่น Genshin Impact',
      subtitle: '🌟 ลดราคา 45% + Primogems 🌟',
      description: 'เซ็ต Traveler! เติม 1,600 บาท ได้ 6,480 Primogems + Character Ascension Pack + Weapon Materials! สำหรับ Traveler ที่พร้อมสำรวจโลก Teyvat',
      imageUrl: 'assets/genshin.jpeg',
      discount: '-45%',
      price: '880 บาท',
      originalPrice: '1,600 บาท',
      bonusItems: ['6,480 Primogems (แต่ได้แค่ Qiqi C6)', 'Character Materials Pack (แต่ไม่ใช่ของ Character ที่มี)', 'Weapon Enhancement Ore (ที่ใช้หมดแต่ยัง +15 ไม่ได้)', 'Resin Refresh x30 (ที่ใช้หมดใน 2 วัน)']
    },
    {
      id: 14,
      title: 'โปรโมชั่น Zenless Zone Zero',
      subtitle: '🔥 ลดราคา 50% + Polychrome 🔥',
      description: 'เซ็ต Proxy! เติม 1,200 บาท ได้ 4,800 Polychrome + Agent Pack + W-Engine Bundle! สำหรับ Proxy ที่พร้อมเข้าสู่ Hollow และต่อสู้กับ Ethereal',
      imageUrl: 'assets/zenless.jpg',
      discount: '-50%',
      price: '600 บาท',
      originalPrice: '1,200 บาท',
      bonusItems: ['4,800 Polychrome (แต่ได้ S-Rank ที่ไม่ต้องการ)', 'Agent Materials Pack (ที่ใช้ไม่ได้เพราะไม่มี Agent นั้น)', 'W-Engine Bundle (ที่ไม่เข้ากับ Agent ที่มี)', 'Battery Charge x50 (ที่ใช้หมดใน 3 วัน)']
    },
    {
      id: 15,
      title: 'โปรโมชั่น Wuthering Waves',
      subtitle: '🌊 ลดราคา 40% + Astrite Pack 🌊',
      description: 'เซ็ต Resonator! เติม 1,000 บาท ได้ 3,600 Astrite + Echo Pack + Weapon Materials! สำหรับ Resonator ที่พร้อมต่อสู้กับ Tacet Discord และปกป้อง Solaris',
      imageUrl: 'assets/Wuthering Waves.jpg',
      discount: '-40%',
      price: '600 บาท',
      originalPrice: '1,000 บาท',
      bonusItems: ['3,600 Astrite (แต่ Pity System โหดกว่า Genshin)', 'Echo Enhancement Pack (แต่ RNG ให้ Stats ขยะ)', '5-Star Weapon Materials (แต่ไม่มี 5-Star Weapon)', 'Waveplates Refill x20 (ที่ใช้หมดใน 1 วัน)']
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
      alert(`🎉 ขอแสดงความยินดี! การสั่งซื้อสำเร็จแล้ว! 🎉

📦 โปรโมชั่นที่สั่งซื้อ: ${this.selectedPromotion?.title}
💰 จำนวนเงินที่ชำระ: ${this.selectedPromotion?.price}
🎁 ของแถมพิเศษ: ${this.selectedPromotion?.bonusItems?.length || 0} รายการ

✅ รหัสการสั่งซื้อ: GM${Date.now().toString().slice(-6)}
📧 ข้อมูลการเติมเกมจะส่งไปยังอีเมล: ${this.paymentData.email}

🎮 ขอบคุณที่เลือกใช้บริการ! เตรียมพร้อมสำหรับการเล่นเกมที่ยิ่งใหญ่กว่าเดิม!`);
      
      // กลับไปหน้าโปรโมชั่น (Router จะเลื่อนไปบนสุดเองแล้ว)
      this.router.navigate(['/promotion']);
    }
  }

  // ตรวจสอบความถูกต้องของฟอร์ม
  validateForm(): boolean {
    if (!this.paymentData.customerName || !this.paymentData.email || !this.paymentData.phone) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
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
}