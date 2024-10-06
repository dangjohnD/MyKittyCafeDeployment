import { TestBed } from '@angular/core/testing';

import { ApptLimitService } from './appt-limit.service';

describe('ApptLimitService', () => {
  let service: ApptLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApptLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
