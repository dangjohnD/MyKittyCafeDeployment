import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { KittyModalComponent } from './kitty-modal.component';

describe('KittyModalComponent', () => {
  let component: KittyModalComponent;
  let fixture: ComponentFixture<KittyModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KittyModalComponent ],
      imports: [IonicModule.forRoot(), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(KittyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
