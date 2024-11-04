import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroProductoEditarPage } from './maestro-producto-editar.page';

describe('MaestroProductoEditarPage', () => {
  let component: MaestroProductoEditarPage;
  let fixture: ComponentFixture<MaestroProductoEditarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroProductoEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
