import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/appointment';
import { AppointmentService } from 'src/app/appointment.service';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.page.html',
  styleUrls: ['./viewall.page.scss'],
})
export class ViewallPage implements OnInit {

  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAllAppointments().subscribe(
      (appointments: Appointment[]) => {
        console.log(appointments);
        this.appointments = appointments;
      },
      (error) => {
        console.error('Error fetching appointments: ', error);
        // Handle error here
      }
    );
  }
}
