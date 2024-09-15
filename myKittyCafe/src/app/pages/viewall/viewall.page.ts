import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/appointment';
import { AppointmentService } from 'src/app/appointment.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.page.html',
  styleUrls: ['./viewall.page.scss'],
})
export class ViewallPage implements OnInit {
  appointments: Appointment[] = [];
  startDate: string = '';
  endDate: string = '';
  filteredAppointments: Appointment[] = [];
  noAppointments: boolean = false;
  endDateBeforeStartDate: boolean = false;
  // boolean variable to track if both start and end dates are provided
  datesNotEmpty: boolean = true;

  userType!: any;

  constructor(private appointmentService: AppointmentService,
      private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.asObserver.subscribe(
      message => { this.userType = message}
    );

    if (this.userType != 'admin@gmail.com' && this.userType){
      this.loadUserAppointments();
    }
  }

  // Method to filter appointments based on selected start and end dates
  filterAppointments() {
    this.filteredAppointments = [];
    if (this.startDate == '' || this.endDate == '') {
      this.datesNotEmpty = false;
      return;
    }

    if (new Date(this.endDate) < new Date(this.startDate)) {
      // Set the boolean variable to true to indicate the error
      this.endDateBeforeStartDate = true;
      return; // Exit the method early
    } else {
      // Reset the boolean variable if there is no error
      this.endDateBeforeStartDate = false;
    }
    this.loadAppointments();

    //Apply filters
    this.filteredAppointments = this.appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      endDate.setDate(endDate.getDate() + 1);
      return appointmentDate >= startDate && appointmentDate <= endDate;
    });

    // Sort the filteredAppointments array by appointment date
    this.filteredAppointments.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
    console.log(this.filteredAppointments);
  }

  loadAppointments() {
    this.appointmentService.getAllAppointments().subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments;
      },
      (error) => {
        console.error('Error fetching appointments: ', error);
      }
    );
  }
  
  loadUserAppointments(){
    this.appointmentService.getAppointmentsByEmails(this.userType).subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments;
        console.log(this.appointments);
        if (appointments.length > 0){
          this.filteredAppointments = appointments;
        }
      },
      (error) => {
        console.error('Error fetching appointments: ', error);
      }
    );
  }
}
