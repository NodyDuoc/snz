import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritotestingPage } from './carritotesting.page';

describe('CarritotestingPage', () => {
  let component: CarritotestingPage;
  let fixture: ComponentFixture<CarritotestingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritotestingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
