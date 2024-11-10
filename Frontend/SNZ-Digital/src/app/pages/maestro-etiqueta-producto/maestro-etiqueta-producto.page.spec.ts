import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroEtiquetaProductoPage } from './maestro-etiqueta-producto.page';

describe('MaestroEtiquetaProductoPage', () => {
  let component: MaestroEtiquetaProductoPage;
  let fixture: ComponentFixture<MaestroEtiquetaProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroEtiquetaProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
