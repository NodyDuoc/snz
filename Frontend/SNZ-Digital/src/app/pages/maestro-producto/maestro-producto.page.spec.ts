import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroProductoPage } from './maestro-producto.page';

describe('MaestroProductoPage', () => {
  let component: MaestroProductoPage;
  let fixture: ComponentFixture<MaestroProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
