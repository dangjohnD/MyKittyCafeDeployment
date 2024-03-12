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
  startDate: string = ""; // Variable to hold the selected start date
  endDate: string = ""; // Variable to hold the selected end date
  filteredAppointments: Appointment[] = [];
  noAppointments: boolean = false;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

   // Method to filter appointments based on selected start and end dates
   filterAppointments() {
    this.filteredAppointments = this.appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      return appointmentDate >= startDate && appointmentDate <= endDate;
    });
   }

  loadAppointments() {
    this.appointmentService.getAllAppointments().subscribe(
      (appointments: Appointment[]) => {
        console.log(appointments);
        this.appointments = appointments;
      },
      (error) => {
        console.error('Error fetching appointments: ', error);
      }
    );
  }
}