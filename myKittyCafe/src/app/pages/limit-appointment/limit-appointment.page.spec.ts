import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LimitAppointmentPage } from './limit-appointment.page';
import { AppointmentService } from 'src/app/appointment.service';

describe('LimitAppointmentPage', () => {
  let component: LimitAppointmentPage;
  let fixture: ComponentFixture<LimitAppointmentPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LimitAppointmentPage],
      providers: [AppointmentService] 
    }).compileComponents();

    fixture = TestBed.createComponent(LimitAppointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});