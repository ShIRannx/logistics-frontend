import { Component, Input } from '@angular/core';
import { Logistics } from '../../logistics.model';

@Component({
  selector: 'app-logistics-container',
  templateUrl: './logistics-container.component.html',
  styleUrls: ['./logistics-container.component.css'],
})
export class LogisticsContainerComponent {
  @Input() logisticses: Logistics[] = [];
  onCopy(trackingNumber: string) {}
}
