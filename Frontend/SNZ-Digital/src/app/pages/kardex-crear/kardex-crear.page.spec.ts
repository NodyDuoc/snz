import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KardexCrearPage } from './kardex-crear.page';

describe('KardexCrearPage', () => {
  let component: KardexCrearPage;
  let fixture: ComponentFixture<KardexCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KardexCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
