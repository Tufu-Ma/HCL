import { Component } from '@angular/core';

@Component({
  selector: 'app-promotion',
  standalone: false,
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent {
  // ข้อมูลโปรโมชั่น
  promotions = [
    {
      title: 'โปรโมชั่นพิเศษ!',
      subtitle: 'ลดราคาสูงสุด 50%',
      description: 'เติมเกมออนไลน์ได้ทุกเกม ด้วยราคาที่คุ้มค่าที่สุด รองรับการชำระเงินหลากหลายช่องทาง',
      features: [
        'ส่วนลด 10% สำหรับลูกค้าใหม่',
        'คะแนนสะสม ใช้แทนเงินสดได้',
        'บริการ 24/7 ตลอดเวลา',
        'รับประกันการเติมเงิน 100%'
      ]
    }
  ];

  currentPromotion = this.promotions[0];
}
