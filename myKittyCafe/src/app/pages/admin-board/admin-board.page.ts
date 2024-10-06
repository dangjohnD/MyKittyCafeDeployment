import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/appointment';
import { AppointmentService } from 'src/app/appointment.service';
import { TimeSlot } from 'src/app/timeslot';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.page.html',
  styleUrls: ['./admin-board.page.scss'],
})
export class AdminBoardPage implements OnInit {


  constructor(private appService: AppointmentService, private router: Router) {
  }

  ngOnInit() {
  }

  
  goToLimit(){
    this.router.navigate(['/limit-appointment']);
  }
}
