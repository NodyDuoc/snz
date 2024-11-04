import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroEtiquetaEditarPage } from './maestro-etiqueta-editar.page';

describe('MaestroEtiquetaEditarPage', () => {
  let component: MaestroEtiquetaEditarPage;
  let fixture: ComponentFixture<MaestroEtiquetaEditarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroEtiquetaEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
