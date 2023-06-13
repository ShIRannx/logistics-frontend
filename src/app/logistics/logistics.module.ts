import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogisticsComponent } from './logistics.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogisticsContainerComponent } from './components/logistics-container/logistics-container.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { loginGuard } from '../auth/guards/login.guard';

@NgModule({
  declarations: [LogisticsComponent, LogisticsContainerComponent],
  imports: [
    CommonModule,
    ClipboardModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: LogisticsComponent, canActivate: [loginGuard] },
    ]),
  ],
})
export class LogisticsModule {}
