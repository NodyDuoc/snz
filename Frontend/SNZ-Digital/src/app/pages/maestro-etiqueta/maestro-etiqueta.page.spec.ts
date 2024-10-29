import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroEtiquetaPage } from './maestro-etiqueta.page';

describe('MaestroEtiquetaPage', () => {
  let component: MaestroEtiquetaPage;
  let fixture: ComponentFixture<MaestroEtiquetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroEtiquetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
