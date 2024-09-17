import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencySummaryComponent } from './currency-summary.component';

describe('CurrencySummaryComponent', () => {
  let component: CurrencySummaryComponent;
  let fixture: ComponentFixture<CurrencySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencySummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
