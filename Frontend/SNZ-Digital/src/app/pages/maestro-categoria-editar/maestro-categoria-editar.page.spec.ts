import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroCategoriaEditarPage } from './maestro-categoria-editar.page';

describe('MaestroCategoriaEditarPage', () => {
  let component: MaestroCategoriaEditarPage;
  let fixture: ComponentFixture<MaestroCategoriaEditarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroCategoriaEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
