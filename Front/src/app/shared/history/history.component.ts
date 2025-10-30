import { Component, OnInit } from '@angular/core';

type HistoryStatus = 'success' | 'pending' | 'failed';

interface HistoryItem {
  id: string;
  createdAt: Date;
  item: string;
  amount: number;
  status: HistoryStatus;
  note?: string;
}

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  // Mock data
  data: HistoryItem[] = [
    { id: 'TXN-202510-0001', createdAt: new Date('2025-10-28T14:12:00'), item: 'เติมเกม Valorant (1,650 VP)', amount: 159, status: 'success', note: 'ชำระผ่าน PromptPay' },
    { id: 'TXN-202510-0002', createdAt: new Date('2025-10-28T16:35:00'), item: 'บัตร Garena 500', amount: 125, status: 'pending', note: 'รอการตรวจสอบสลิป' },
    { id: 'TXN-202510-0003', createdAt: new Date('2025-10-29T09:05:00'), item: 'VIP 30 วัน', amount: 199, status: 'success' },
    { id: 'TXN-202510-0004', createdAt: new Date('2025-10-29T10:48:00'), item: 'LoL Wild Rift 1,000 คอยน์', amount: 149, status: 'failed', note: 'ชำระเงินไม่สำเร็จ' },
    { id: 'TXN-202510-0005', createdAt: new Date('2025-10-30T11:20:00'), item: 'Steam 300', amount: 289, status: 'success' },
    { id: 'TXN-202510-0006', createdAt: new Date('2025-10-30T12:02:00'), item: 'HSR 980 Jade', amount: 249, status: 'pending', note: 'รอตรวจสอบ' },
  ];

  // Filters
  searchText = '';
  statusFilter: '' | HistoryStatus = '';
  dateFrom?: string; // 'YYYY-MM-DD'
  dateTo?: string;

  // Sort
  sortKey: keyof HistoryItem | 'createdAt' | 'amount' = 'createdAt';
  sortDir: 'asc' | 'desc' = 'desc';

  // Pagination
  page = 1;
  pageSize = 10;

  ngOnInit(): void {}

  get filtered(): HistoryItem[] {
    const text = this.searchText.trim().toLowerCase();
    const from = this.dateFrom ? new Date(this.dateFrom + 'T00:00:00') : undefined;
    const to = this.dateTo ? new Date(this.dateTo + 'T23:59:59') : undefined;

    let arr = this.data.filter(item => {
      const matchText =
        !text ||
        item.id.toLowerCase().includes(text) ||
        item.item.toLowerCase().includes(text) ||
        (item.note ?? '').toLowerCase().includes(text);

      const matchStatus = !this.statusFilter || item.status === this.statusFilter;

      const d = item.createdAt;
      const matchFrom = !from || d >= from;
      const matchTo = !to || d <= to;

      return matchText && matchStatus && matchFrom && matchTo;
    });

    // sort
    arr = arr.sort((a, b) => {
      const A = this.getSortValue(a);
      const B = this.getSortValue(b);
      if (A < B) return this.sortDir === 'asc' ? -1 : 1;
      if (A > B) return this.sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return arr;
  }

  private getSortValue(item: HistoryItem): number | string {
    switch (this.sortKey) {
      case 'createdAt': return item.createdAt.getTime();
      case 'amount': return item.amount;
      case 'id': return item.id;
      case 'item': return item.item;
      case 'status': return item.status;
      default: return '';
    }
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
  }

  get paged(): HistoryItem[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  setSort(key: typeof this.sortKey): void {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDir = key === 'createdAt' ? 'desc' : 'asc';
    }
    this.page = 1;
  }

  clearFilters(): void {
    this.searchText = '';
    this.statusFilter = '';
    this.dateFrom = undefined;
    this.dateTo = undefined;
    this.page = 1;
  }

  badgeClass(status: HistoryStatus): string {
    switch (status) {
      case 'success': return 'badge-soft-success';
      case 'pending': return 'badge-soft-warning';
      case 'failed':  return 'badge-soft-danger';
    }
  }

  formatTHB(n: number): string {
    return n.toLocaleString('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 });
  }

  goFirst(): void { this.page = 1; }
  prev(): void    { if (this.page > 1) this.page--; }
  next(): void    { if (this.page < this.totalPages) this.page++; }
  goLast(): void  { this.page = this.totalPages; }

  trackById = (_: number, item: HistoryItem) => item.id;
}
