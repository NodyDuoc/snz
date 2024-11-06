import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NecesidadesPcPage } from './necesidades-pc.page';

describe('NecesidadesPcPage', () => {
  let component: NecesidadesPcPage;
  let fixture: ComponentFixture<NecesidadesPcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NecesidadesPcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
