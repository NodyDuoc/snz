import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroEtiquetaCrearPage } from './maestro-etiqueta-crear.page';

describe('MaestroEtiquetaCrearPage', () => {
  let component: MaestroEtiquetaCrearPage;
  let fixture: ComponentFixture<MaestroEtiquetaCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroEtiquetaCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
