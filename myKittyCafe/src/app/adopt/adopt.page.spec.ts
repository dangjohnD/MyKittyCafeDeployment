import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdoptPage } from './adopt.page';

describe('AdoptPage', () => {
  let component: AdoptPage;
  let fixture: ComponentFixture<AdoptPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdoptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
