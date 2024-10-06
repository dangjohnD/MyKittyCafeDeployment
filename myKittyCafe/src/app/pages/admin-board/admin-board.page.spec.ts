import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminBoardPage } from './admin-board.page';

describe('AdminBoardPage', () => {
  let component: AdminBoardPage;
  let fixture: ComponentFixture<AdminBoardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
