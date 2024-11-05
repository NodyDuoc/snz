import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroCategoriaCrearPage } from './maestro-categoria-crear.page';

describe('MaestroCategoriaCrearPage', () => {
  let component: MaestroCategoriaCrearPage;
  let fixture: ComponentFixture<MaestroCategoriaCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroCategoriaCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
