import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoProductoPage } from './info-producto.page';

describe('InfoProductoPage', () => {
  let component: InfoProductoPage;
  let fixture: ComponentFixture<InfoProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
