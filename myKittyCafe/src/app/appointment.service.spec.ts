import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment';

/*
Disregard VSCode toBe, toBeTruthy and toEquals error
vscode is mixing up cypress and jasmine
ng test still performs
*/
describe('AppointmentService', () => {
  let service: AppointmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppointmentService],
    });
    service = TestBed.inject(AppointmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const mockAppointment: Appointment = {
    id: 69,
    firstName: 'Testing',
    lastName: 'Karma',
    persons: 2,
    phone: '123-345-6432',
    email: 'Late@example.com',
    date: '2024-03-30T21:00:00.000+00:00',
  };

  it('should add an appointment', () => {
    const dummyAppointment: Appointment = {
      firstName: 'Testing',
      lastName: 'Karma',
      persons: 2,
      phone: '123-345-6432',
      email: 'Late@example.com',
      date: '2024-03-30T21:00:00.000+00:00',
    };
    service.addAppointment(dummyAppointment).subscribe((response) => {
      expect(response).toEqual(mockAppointment);
      console.log(response);
      // Add additional expectations as needed
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockAppointment);
  });


  it('should get all appointments', () => {
    const dummyAppointments: Appointment[] = [
      /* dummy data */
    ];
    service.getAllAppointments().subscribe((appointments) => {
      expect(appointments).toEqual(dummyAppointments);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAppointments);
  });

  it('should get all user appointments', () => {
    const dummyAppointments: Appointment[] = [
      /* dummy data */
    ];
    service.getAppointmentsByEmails('mail@gmail.com').subscribe((appointments) => {
      expect(appointments).toEqual(dummyAppointments);
    });

    const req = httpMock.expectOne(service.apiUrl + '/email/mail@gmail.com');
    expect(req.request.method).toBe('GET');
    req.flush(dummyAppointments);
  });
});
