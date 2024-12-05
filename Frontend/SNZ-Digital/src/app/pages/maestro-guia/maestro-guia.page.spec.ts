import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroGuiaPage } from './maestro-guia.page';

describe('MaestroGuiaPage', () => {
  let component: MaestroGuiaPage;
  let fixture: ComponentFixture<MaestroGuiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroGuiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
