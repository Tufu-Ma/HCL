import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: false,
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
  // ข้อมูลส่วนตัว
  profile = {
    name: 'Term Sub Wai Fai Look',
    bio: 'เราคือผู้ให้บริการเติมเกมออนไลน์ เป็นเพียงตัวแทนจำหน่ายเท่านั้น โปรดระวังมิจฉาชีพแอบอ้างบัญชีเรา',
    email: 'ติดต่อเรา : contact@termsub.com',
  };
}
