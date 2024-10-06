import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LimitAppointmentPage } from './limit-appointment.page';

describe('LimitAppointmentPage', () => {
  let component: LimitAppointmentPage;
  let fixture: ComponentFixture<LimitAppointmentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LimitAppointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
