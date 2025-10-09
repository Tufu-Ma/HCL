import { Component } from '@angular/core';

@Component({
  selector: 'app-promotion',
  standalone: false,
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent {
  // ข้อมูลโปรโมชั่นหลายๆ แบบ
  promotions = [
    {
      id: 1,
      title: 'โปรโมชั่นสมาชิกใหม่',
      subtitle: 'ลดราคาสูงสุด 50%',
      description: 'เติมเกมออนไลน์ได้ทุกเกม ด้วยราคาที่คุ้มค่าที่สุด รองรับการชำระเงินหลากหลายช่องทาง',
      discount: '50%',
      imageUrl: 'assets/testBG.jpg',
      features: [
        'ส่วนลด 10% สำหรับลูกค้าใหม่',
        'คะแนนสะสม ใช้แทนเงินสดได้',
        'บริการ 24/7 ตลอดเวลา',
        'รับประกันการเติมเงิน 100%'
      ]
    },
    {
      id: 2,
      title: 'โปรโมชั่นสมาชิก VIP',
      subtitle: 'ส่วนลดพิเศษ 70%',
      description: 'สำหรับสมาชิก VIP รับส่วนลดพิเศษสูงสุด และสิทธิประโยชน์เพิ่มเติมอีกมากมาย',
      discount: '70%',
      imageUrl: 'assets/testBG.jpg',
      features: [
        'ส่วนลดสูงสุด 70%',
        'ปลอดค่าธรรมเนียมทุกรายการ',
        'แคชแบ็ค 5% ทุกครั้งที่เติม',
        'บริการลูกค้า VIP เฉพาะ'
      ]
    },
    {
      id: 3,
      title: 'โปรโมชั่นวันหยุด',
      subtitle: 'ลดราคา 30% ทุกเกม',
      description: 'โปรโมชั่นพิเศษสำหรับวันหยุด เติมเกมทุกชนิดได้ในราคาพิเศษ',
      discount: '30%',
      imageUrl: 'assets/testBG.jpg',
      features: [
        'ส่วนลด 30% ทุกเกม',
        'ไม่มีขั้นต่ำในการสั่งซื้อ',
        'รับคูปองเพิ่มเติม',
        'โบนัสคะแนนสะสม x2'
      ]
    },
    {
      id: 4,
      title: 'โปรโมชั่นกลุ่ม',
      subtitle: 'ซื้อรวมลด 40%',
      description: 'เติมเกมแบบกลุ่มใหญ่ รับส่วนลดสูงสุด พร้อมสิทธิพิเศษอีกมากมาย',
      discount: '40%',
      imageUrl: 'assets/testBG.jpg',
      features: [
        'ส่วนลด 40% เมื่อซื้อครบ 5 รายการ',
        'จัดส่งฟรีทุกออเดอร์',
        'บริการจัดการรายการแบบกลุ่ม',
        'ดูแลโดยทีมผู้เชี่ยวชาญ'
      ]
    },
    {
      id: 5,
      title: 'โปรโมชั่นแฟลชเซล',
      subtitle: 'ลดเหลือ 199 บาท',
      description: 'โปรโมชั่นจำกัดเวลา! เติมเกมยอดนิยมในราคาเพียง 199 บาท',
      discount: 'เพียง 199฿',
      imageUrl: 'assets/testBG.jpg',
      features: [
        'ราคาพิเศษเพียง 199 บาท',
        'จำกัดเวลา 24 ชั่วโมงเท่านั้น',
        'ครอบคลุมเกมยอดนิยม 20+ เกม',
        'การันตีราคาถูกที่สุด'
      ]
    },
    {
      id: 6,
      title: 'โปรโมชั่นรายเดือน',
      subtitle: 'สมัครสมาชิกรายเดือน',
      description: 'สมัครสมาชิกรายเดือนรับสิทธิพิเศษและส่วนลดตลอดเดือน',
      discount: 'ส่วนลดตลอดเดือน',
      imageUrl: 'assets/testBG.jpg',
      features: [
        'ส่วนลด 15% ตลอดเดือน',
        'ไม่มีขั้นต่ำในการใช้งาน',
        'ยกเลิกได้ทุกเมื่อ',
        'โบนัสพิเศษสำหรับสมาชิก'
      ]
    }
  ];

  // เมธอดสำหรับ trackBy ใน ngFor
  trackById(index: number, promotion: any): number {
    return promotion.id;
  }

  // เมธอดสำหรับการเลือกโปรโมชั่น
  selectPromotion(promotion: any): void {
    console.log('เลือกโปรโมชั่น:', promotion.title);
    // สามารถเพิ่มการทำงานเพิ่มเติมได้ เช่น navigate หรือ show modal
  }
}
