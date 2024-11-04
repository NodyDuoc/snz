import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KardexEditarPage } from './kardex-editar.page';

describe('KardexEditarPage', () => {
  let component: KardexEditarPage;
  let fixture: ComponentFixture<KardexEditarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KardexEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
