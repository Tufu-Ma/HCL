import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const { username, password } = this.form.value;

    // ✅ ตรวจสอบว่าเป็น admin หรือไม่
    if (username === 'admin' && password === 'admin') {
      const token = btoa(`admin-${Date.now()}`);
      localStorage.setItem('token', token);
      localStorage.setItem('role', 'admin');
      localStorage.setItem('username', 'admin');

      Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบในฐานะผู้ดูแลระบบ',
        timer: 1500,
        showConfirmButton: false
      });

      this.router.navigate(['/addgame']); // เข้าได้เฉพาะ admin
    } 
    else if (username && password) {
      const token = btoa(`${username}-${Date.now()}`);
      localStorage.setItem('token', token);
      localStorage.setItem('role', 'user');
      localStorage.setItem('username', username);

      Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ!',
        text: `ยินดีต้อนรับ ${username}`,
        timer: 1500,
        showConfirmButton: false
      });

      this.router.navigate(['/home']);
    } 
    else {
      Swal.fire({
        icon: 'error',
        title: 'เข้าสู่ระบบล้มเหลว',
        text: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
      });
    }

    this.submitting = false;
  }
}
