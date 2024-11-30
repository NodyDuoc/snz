import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuiaPage } from './guia.page';

describe('GuiaPage', () => {
  let component: GuiaPage;
  let fixture: ComponentFixture<GuiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
