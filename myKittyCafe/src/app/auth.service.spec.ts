import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in successfully', () => {
    const mockResponse = { message: 'success' };
    const username = 'testuser';
    const password = 'testpass';

    service.login(username, password).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Check if returned message matches expected message
    });

    const req = httpMock.expectOne(`${service.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password });

    req.flush({ message: 'success' }, { status: 200, statusText: 'OK' });
  });

  it('should handle login errors', () => {
    const username = 'testuser';
    const password = 'testpass';

    service.login(username, password).subscribe({
      error: (err) => {
        expect(err).toBeTruthy(); // Check if error is truthy
      },
    });

    const req = httpMock.expectOne(`${service.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(null, { status: 401, statusText: 'Unauthorized' });
  });

  it('should register successfully', () => {
    const mockResponse = { success: true };
    const firstName = 'John';
    const lastName = 'Doe';
    const username = 'johndoe';
    const password = 'password';

    service
      .register(firstName, lastName, username, password)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse); // Check if registration response matches expected response
      });

    const req = httpMock.expectOne(`${service.apiUrl}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      firstName,
      lastName,
      username,
      password,
    });
    req.flush(mockResponse);
  });

  it('should handle registration errors', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const username = 'johndoe';
    const password = 'password';

    service.register(firstName, lastName, username, password).subscribe({
      error: (err) => {
        expect(err).toBeTruthy(); // Check if error is truthy
      },
    });

    const req = httpMock.expectOne(`${service.apiUrl}/users`);
    expect(req.request.method).toBe('POST');
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should log out successfully', () => {
    service.logout();
    expect(service.message.getValue()).toEqual(''); // Check if message is cleared after logout
  });

  it('should set message correctly', () => {
    const mockMessage = 'Test message';
    service.setMessage(mockMessage);
    expect(service.message.getValue()).toEqual(mockMessage); // Check if message is set correctly
  });
});
