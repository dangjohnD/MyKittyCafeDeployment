import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApptLimitService } from './appt-limit.service';
import { apptLimit } from './apptLimit';

describe('ApptLimitService', () => {
  let service: ApptLimitService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApptLimitService],
    });
    service = TestBed.inject(ApptLimitService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all apptLimits', () => {
    const dummyApptLimit: apptLimit[] = [
      /* dummy data */
    ];
    service.getAppointmentLimits().subscribe((appLimit) => {
      expect(appLimit).toEqual(dummyApptLimit);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyApptLimit);
  });


  const mockApptLimit: apptLimit = {
    id: 21,
    limit: 2,
    date: '2024-10-20T10:00:00.000Z'
  };
  
  it('should add an apptLimit', () => {
    const dummyApptLimit: apptLimit = {
      id: 21,
      limit: 2,
      date: '2024-10-20T10:00:00.000Z'
    };
    service.addAppointmentLimit(dummyApptLimit).subscribe((response) => {
      expect(response).toEqual(mockApptLimit);
      console.log(response);
    });
  
    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockApptLimit);
  });

});




