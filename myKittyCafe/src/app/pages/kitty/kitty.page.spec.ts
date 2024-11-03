import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KittyPage } from './kitty.page';

describe('KittyPage', () => {
  let component: KittyPage;
  let fixture: ComponentFixture<KittyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(KittyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
