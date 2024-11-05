import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroDespachoPage } from './maestro-despacho.page';

describe('MaestroDespachoPage', () => {
  let component: MaestroDespachoPage;
  let fixture: ComponentFixture<MaestroDespachoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroDespachoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
