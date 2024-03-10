import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/appointment';
import { AppointmentService } from 'src/app/appointment.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  public addAppointment: Appointment = {
    firstName: '',
    lastName: '',
    persons: 1,
    phone: '',
    email: '',
    date: new Date(),
  };

  public hello: String = "Hello";
  minDate: string;

  constructor(private appService: AppointmentService) {
    const today = new Date();
    this.minDate = today.toISOString();
  }

  ngOnInit() {}


  checkavail(event: CustomEvent){
    const datePicked = event.detail.value;
    console.log("date changed" + datePicked)
  }

  demo() {
    console.log("doing adding")
    const formattedString = `
      First Name: ${this.addAppointment.firstName}
      Last Name: ${this.addAppointment.lastName}
      Persons: ${this.addAppointment.persons}
      Phone: ${this.addAppointment.phone}
      Email: ${this.addAppointment.email}
      Date: ${this.addAppointment.date}
    `;
    console.log(formattedString);
    
    this.appService.addAppointment(this.addAppointment).subscribe(
      response => {
        console.log('Appointment added successfully:', response);
      },
      error => {
        console.error('Error adding appointment:', error);
      }
    );
  }
}