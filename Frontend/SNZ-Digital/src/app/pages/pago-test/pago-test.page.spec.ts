import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoTestPage } from './pago-test.page';

describe('PagoTestPage', () => {
  let component: PagoTestPage;
  let fixture: ComponentFixture<PagoTestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
