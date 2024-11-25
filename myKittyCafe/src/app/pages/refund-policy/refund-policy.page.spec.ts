import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RefundPolicyPage } from './refund-policy.page';

describe('RefundPolicyPage', () => {
  let component: RefundPolicyPage;
  let fixture: ComponentFixture<RefundPolicyPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(RefundPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
