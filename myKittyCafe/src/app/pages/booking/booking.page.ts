import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/appointment';
import { AppointmentService } from 'src/app/appointment.service';
import { TimeSlot } from 'src/app/timeslot';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  public addAppointment: Appointment = {
    firstName: '',
    lastName: '',
    persons: 0,
    phone: '',
    email: '',
    date: '',
  };

  emailValid: boolean = true;
  phoneValid: boolean = true;
  numValid: boolean = true;
  fNameValid: boolean = true;
  lNameValid: boolean = true;
  dateValid: boolean = true;
  timeslotSelected: boolean = false;

  minDate: string;
  timeSlots: TimeSlot[] = [];
  showCalendarFlag: boolean = false;

  constructor(private appService: AppointmentService, private router: Router) {
    // Get the current date and time in UTC
    const dateNow = new Date();
    
    // Adjust the current date and time to Eastern Daylight Time (EDT, UTC-4)
    dateNow.setUTCHours(dateNow.getUTCHours());

    // Get the date part in ISO format (YYYY-MM-DD)
    const isoDateString = dateNow.toISOString().split('T')[0];

    // Set the minimum date for the component
    this.minDate = isoDateString;
}


  ngOnInit() {}

  dateChanged(event: CustomEvent<any>) {
    const selectedDate = new Date(event.detail.value);
    const utcSelectedDate = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedDate.getHours(),
        selectedDate.getMinutes(),
        selectedDate.getSeconds()
      )
    );
    this.addAppointment.date = utcSelectedDate.toISOString();

    //get timeslots
    this.appService
      .getAllAppointments()
      .subscribe((appointments: Appointment[]) => {
        this.timeSlots = this.getTimeSlots(appointments);
      });
  }

  bookAppointment() {
    // do not book if email or phone is invalid
    if (!this.emailValid || !this.phoneValid) {
      return;
    }

    // do not book if missing input
    if (this.isAppointmentEmpty(this.addAppointment)) {
      return;
    }

    const formattedString = `
      First Name: ${this.addAppointment.firstName}
      Last Name: ${this.addAppointment.lastName}
      Persons: ${this.addAppointment.persons}
      Phone: ${this.addAppointment.phone}
      Email: ${this.addAppointment.email}
      Date: ${this.addAppointment.date}
    `;

    // Appointment info is right
    this.router.navigate(['/appt-summary'], {
      state: this.addAppointment,
    });


    /*
    this.appService.addAppointment(this.addAppointment).subscribe(
      (response) => {
        this.router.navigate(['/appt-info'], {
          state: { state: this.addAppointment },
        });
        this.clear();
      },
      (error) => {
        console.error('Error adding appointment:', error);
      }
    );
    */
  }

  validateEmail(email: string): boolean {
    // Regex for basic email validation
    const emailPattern: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  validatePhone(phone: string): boolean {
    // Regex for phone number validation in the format "123-123-1234"
    const phonePattern: RegExp = /^\d{3}-\d{3}-\d{4}$/;
    return phonePattern.test(phone);
  }

  onEmailChange() {
    this.emailValid = this.validateEmail(this.addAppointment.email);
  }

  formatPhoneNumber() {
    // Remove all non-numeric characters from the input value
    let formattedNumber = this.addAppointment.phone.replace(/\D/g, '');

    // Format the number with dashes if it's 10 digits long
    if (formattedNumber.length === 10) {
      formattedNumber = formattedNumber.replace(
        /(\d{3})(\d{3})(\d{4})/,
        '$1-$2-$3'
      );
    }

    // Update the input value
    this.addAppointment.phone = formattedNumber;
    this.phoneValid = this.validatePhone(this.addAppointment.phone);
  }

  showCalendar(event: any) {
    // Show the calendar only if the number of persons is selected
    const selectedValue = event.detail.value;
    this.addAppointment.persons = parseInt(selectedValue);
    this.showCalendarFlag = this.addAppointment.persons != null;
    this.timeslotSelected = false
    this.timeSlots = [];
  }

  changeAppointmentTime(timeSlot: string) {
    // if there is not enough capacity, return
    if (!this.enoughCapacity(timeSlot)) {
      return;
    }

    const timeParts = timeSlot.split(' '); // Split the time slot string into parts
    const hour = parseInt(timeParts[0]); // Extract the hour from the first part
    const amPm = timeParts[1]; // Extract AM/PM from the second part

    // Parse the existing date string into a Date object
    const appointmentDate = new Date(this.addAppointment.date);

    // Adjust the hour based on AM/PM
    let adjustedHour = hour;
    if (amPm.toLowerCase() === 'pm' && hour !== 12) {
      adjustedHour += 12; // Add 12 hours for PM except for 12 PM
    } else if (amPm.toLowerCase() === 'am' && hour === 12) {
      adjustedHour += 0; // For 12 AM, set hour to 0
    }



    // Set the adjusted hour in UTC
    appointmentDate.setUTCHours(adjustedHour);

    // Set the minutes and seconds to 0 in UTC
    appointmentDate.setUTCMinutes(0);
    appointmentDate.setUTCSeconds(0);

    // Format the updated date back into a string in ISO 8601 format
    const updatedDateString = appointmentDate.toISOString();
    console.log(updatedDateString);


    // Update the date property of the addAppointment object with the updated date string
    this.addAppointment.date = updatedDateString;
    this.timeslotSelected = true;
    this.highlightTime(timeSlot);
    console.log(this.addAppointment.date)
  }

  getTimeSlots(appointments: Appointment[]): TimeSlot[] {
    this.timeSlots = [];
    // Initialize the time slots from 9am to 5pm with an initial count of 0 appointments
    const timeSlots: TimeSlot[] = [];

    // Generate time slots from 9am to 11am
    for (let hour = 9; hour <= 11; hour++) {
      timeSlots.push({
        time: hour + ' am',
        numAppt: 0,
        isSelected: false,
        aboveCapacity: false,
      });
    }

    // Generate time slots from 12pm to 5pm
    for (let hour = 12; hour <= 17; hour++) {
      const time = hour > 12 ? hour - 12 + ' pm' : hour + ' pm';
      timeSlots.push({
        time,
        numAppt: 0,
        isSelected: false,
        aboveCapacity: false,
      });
    }

    if (!appointments) {
      return timeSlots;
    }

    appointments.forEach((appointment) => {
      // if the day matches
      if (this.isSameDay(appointment.date, this.addAppointment.date)) {
        const appointmentDate = new Date(appointment.date);

        // Add the appointment to the current timeslots+4 for
        const hour = appointmentDate.getHours() + 4;
        const timeSlotIndex = hour - 9;
        if (timeSlotIndex >= 0 && timeSlotIndex < timeSlots.length) {
          timeSlots[timeSlotIndex].numAppt += appointment.persons;
        }
      }
    });

    // indicate if timeslot does not have room
    timeSlots.forEach((timeslot) =>{
      if (timeslot.numAppt + this.addAppointment.persons > 10){
        timeslot.aboveCapacity = true;
      }
    })

    return timeSlots;
  }

  isSameDay(dateString1: string, dateString2: string): boolean {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    // Compare year, month, and day components in UTC
    const isSameYear = date1.getUTCFullYear() === date2.getUTCFullYear();
    const isSameMonth = date1.getUTCMonth() === date2.getUTCMonth();
    const isSameDay = date1.getUTCDate() === date2.getUTCDate();

    return isSameYear && isSameMonth && isSameDay;
  }

  // once selected, give css class to highlight
  highlightTime(timeSlotStr: String) {
    this.timeSlots.forEach((timeslot) => {
      if (timeSlotStr == timeslot.time) {
        timeslot.isSelected = true;
      } else {
        timeslot.isSelected = false;
      }
    });
  }

  enoughCapacity(timeStr: String) {
    var enough = true;
    this.timeSlots.forEach((timeslot) => {
      if (timeStr == timeslot.time) {
        enough = !(this.addAppointment.persons + timeslot.numAppt > 10);
      }
    });
    return enough;
  }

  isAppointmentEmpty(appointment: Appointment): boolean {
    // Check if any of the properties are empty

    if (appointment.firstName.trim() === '') {
      this.fNameValid = false;
    }else{
      this.fNameValid = true;
    }

    if (appointment.lastName.trim() === '') {
      this.lNameValid = false;
    }else{
      this.fNameValid = true;
    }

    if (appointment.persons <= 0 || appointment.persons > 10) {
      this.numValid = false;
    }else{
      this.numValid = true;
    }

    if (appointment.phone.trim() === '') {
      this.phoneValid = false;
    }else{
      this.phoneValid = true;
    }

    if (appointment.email.trim() === '') {
      this.emailValid = false;
    }else{
      this.emailValid = true;
    }

    if (appointment.date.trim() === '') {
      this.dateValid = false;
    }else{
      this.dateValid = true;
    }

    // Return true if any property is empty, otherwise return false
    return (
      appointment.firstName.trim() === '' ||
      appointment.lastName.trim() === '' ||
      appointment.persons <= 0 || appointment.persons > 10 ||
      appointment.phone.trim() === '' ||
      appointment.email.trim() === '' ||
      appointment.date.trim() === '' ||
      this.timeslotSelected == false
    );
  }

  clear(){
    this.addAppointment.firstName = '';
    this.addAppointment.lastName = '';
    this.addAppointment.persons = 0;
    this.addAppointment.phone = '';
    this.addAppointment.email = '';
    this.addAppointment.date = '';

    this.emailValid = true;
  this.phoneValid = true;
  this.numValid = true;
  this.fNameValid = true;
  this.lNameValid = true;
  this.dateValid = true;
  this.timeslotSelected = false;

  this.showCalendarFlag = false;
  this.timeSlots = [];
  }


}
