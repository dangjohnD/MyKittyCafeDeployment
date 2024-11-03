import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { AdminBoardPage } from './admin-board.page';
import { AppointmentService } from 'src/app/appointment.service'; // Import your service

describe('AdminBoardPage', () => {
  let component: AdminBoardPage;
  let fixture: ComponentFixture<AdminBoardPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdminBoardPage],
      providers: [AppointmentService] 
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
