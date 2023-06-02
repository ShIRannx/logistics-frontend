import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsContainerComponent } from './logistics-container.component';

describe('LogisticsContainerComponent', () => {
  let component: LogisticsContainerComponent;
  let fixture: ComponentFixture<LogisticsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogisticsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
