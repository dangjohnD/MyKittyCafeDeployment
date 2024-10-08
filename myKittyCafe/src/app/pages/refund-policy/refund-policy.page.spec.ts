import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RefundPolicyPage } from './refund-policy.page';

describe('RefundPolicyPage', () => {
  let component: RefundPolicyPage;
  let fixture: ComponentFixture<RefundPolicyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RefundPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
