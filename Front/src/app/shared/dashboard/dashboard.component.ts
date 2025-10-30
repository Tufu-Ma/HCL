import { Component, OnInit } from '@angular/core';

interface Stat {
  key: string;
  label: string;
  value: string | number;
  diff: number; // เปอร์เซ็นต์เพิ่ม/ลด เทียบงวดก่อน
}

interface RecentItem {
  id: string;
  customer: string;
  item: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  createdAt: Date;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // สำคัญ: non-standalone (ไม่ใส่ standalone:true)
})
export class DashboardComponent implements OnInit {
  period: 'today' | '7d' | '30d' = '7d';

  stats: Stat[] = [
    { key: 'revenue',  label: 'รายได้รวม',        value: '฿ 48,920', diff: +12.4 },
    { key: 'orders',   label: 'ออเดอร์',          value: 312,        diff: +5.8  },
    { key: 'conv',     label: 'Conversion',        value: '2.7%',     diff: +0.3  },
    { key: 'aov',      label: 'มูลค่าเฉลี่ย/บิล', value: '฿ 157',    diff: -1.2  },
  ];

  recent: RecentItem[] = [
    { id: 'ORD-10031', customer: 'Somchai', item: 'Valorant VP 1,650', amount: 159, status: 'success', createdAt: new Date('2025-10-30T12:30') },
    { id: 'ORD-10030', customer: 'Napat',   item: 'HBO Max 1 เดือน',   amount: 199, status: 'pending', createdAt: new Date('2025-10-30T11:55') },
    { id: 'ORD-10029', customer: 'Mint',    item: 'Steam 300',          amount: 289, status: 'success', createdAt: new Date('2025-10-30T10:40') },
    { id: 'ORD-10028', customer: 'Karn',    item: 'Wild Rift 1,000',    amount: 149, status: 'failed',  createdAt: new Date('2025-10-30T09:20') },
  ];

  // mock series สำหรับกราฟเล็ก ๆ (0-100)
  revenueSeries = [20, 30, 25, 45, 40, 60, 55, 70, 66, 78, 74, 90];
  ordersSeries  = [10, 12, 18, 22, 20, 24, 26, 30, 28, 35, 38, 40];

  ngOnInit(): void {}

  badgeClass(s: RecentItem['status']) {
    switch (s) {
      case 'success': return 'badge-soft-success';
      case 'pending': return 'badge-soft-warning';
      case 'failed':  return 'badge-soft-danger';
    }
  }

  // สร้าง path สำหรับ sparkline SVG
  sparkPath(series: number[], w = 220, h = 60): string {
    if (!series.length) return '';
    const max = Math.max(...series);
    const min = Math.min(...series);
    const dx = w / (series.length - 1 || 1);
    const norm = (v: number) => {
      if (max === min) return h / 2;
      const y = h - ((v - min) / (max - min)) * h;
      return Math.max(0, Math.min(h, y));
    };
    return series.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * dx},${norm(v)}`).join(' ');
  }
}
