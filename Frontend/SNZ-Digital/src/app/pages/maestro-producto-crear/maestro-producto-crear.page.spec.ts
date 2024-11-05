import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroProductoCrearPage } from './maestro-producto-crear.page';

describe('MaestroProductoCrearPage', () => {
  let component: MaestroProductoCrearPage;
  let fixture: ComponentFixture<MaestroProductoCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroProductoCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
