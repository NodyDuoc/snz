import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroCategoriaPage } from './maestro-categoria.page';

describe('MaestroCategoriaPage', () => {
  let component: MaestroCategoriaPage;
  let fixture: ComponentFixture<MaestroCategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
