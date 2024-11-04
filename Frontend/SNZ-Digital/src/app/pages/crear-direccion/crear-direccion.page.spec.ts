import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearDireccionPage } from './crear-direccion.page';

describe('CrearDireccionPage', () => {
  let component: CrearDireccionPage;
  let fixture: ComponentFixture<CrearDireccionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDireccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
