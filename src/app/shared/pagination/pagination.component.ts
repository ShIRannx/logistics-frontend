import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() page: number = NaN;
  @Input() total: number = NaN;
  @Input() capacity: number = 5;
  @Output() changePage = new EventEmitter<number>();

  getPages() {
    let start;
    if (this.page <= 1) start = 1;
    else start = this.page - Math.floor(this.total / 2) + 1;
    const end_temp = start + this.total - 1;
    const end = Math.min(end_temp, start + this.capacity - 1);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);

    return pages;
  }
  onChangePage(page: number) {
    this.changePage.emit(page);
  }
}
