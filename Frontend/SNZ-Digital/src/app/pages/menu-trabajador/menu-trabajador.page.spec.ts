import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuTrabajadorPage } from './menu-trabajador.page';

describe('MenuTrabajadorPage', () => {
  let component: MenuTrabajadorPage;
  let fixture: ComponentFixture<MenuTrabajadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTrabajadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
