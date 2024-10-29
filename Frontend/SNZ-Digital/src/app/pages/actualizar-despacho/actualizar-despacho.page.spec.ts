import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizarDespachoPage } from './actualizar-despacho.page';

describe('ActualizarDespachoPage', () => {
  let component: ActualizarDespachoPage;
  let fixture: ComponentFixture<ActualizarDespachoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarDespachoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
