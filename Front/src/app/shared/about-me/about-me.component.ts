import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: false,
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
  // ข้อมูลเกี่ยวกับเรา
  aboutUs = {
    companyName: 'Term Sub Wai Fai Look',
    tagline: '🎮 ผู้ให้บริการเติมเกมออนไลน์อันดับ 1 ในไทย 🎮',
    subtitle: '⚡ บริการรวดเร็ว ปลอดภัย ราคาดีที่สุด ⚡',
    description: 'Term Sub Wai Fai Look คือผู้นำด้านการให้บริการเติมเกมออนไลน์ที่มีประสบการณ์กว่า 5 ปี\nเราให้บริการเติมเงินเกมยอดนิยมทุกประเภท ด้วยระบบที่ปลอดภัย รวดเร็ว และมีทีมงานคุณภาพคอยให้คำปรึกษา 24 ชั่วโมง',
    features: [
      {
        icon: '🚀',
        title: 'เติมเงินรวดเร็วทันใจ',
        description: 'ระบบอัตโนมัติ ได้เงินใน 1-5 นาที'
      },
      {
        icon: '🔒',
        title: 'ปลอดภัย 100%',
        description: 'ระบบรักษาความปลอดภัยระดับธนาคาร'
      },
      {
        icon: '💰',
        title: 'ราคาดีที่สุด',
        description: 'รับประกันราคาถูกกว่าที่อื่น'
      },
      {
        icon: '🎯',
        title: 'บริการครบวงจร',
        description: 'รองรับเกมยอดนิยมทุกเกม'
      }
    ],
    whyChooseUs: [
      'ประสบการณ์มากกว่า 5 ปี ในวงการเกมออนไลน์',
      'ลูกค้ากว่า 50,000+ คน ที่ไว้วางใจ',
      'รองรับการชำระเงินหลากหลายช่องทาง',
      'ทีมงานมืออาชีพพร้อมให้บริการตลอด 24 ชั่วโมง',
      'รับประกันการเติมเงิน หากไม่ได้รับคืนเงิน 100%'
    ]
  };

  // ข้อมูลติดต่อ
  contactInfo = {
    email: {
      icon: '📧',
      label: 'อีเมล',
      value: 'contact@termsubwaifailook.com'
    },
    phone: {
      icon: '📞',
      label: 'โทรศัพท์',
      value: '02-xxx-xxxx'
    },
    line: {
      icon: '💬',
      label: 'Line',
      value: '@termsubwaifai'
    }
  };
}
