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
    const today = new Date();
    const isoDateString = today.toISOString().split('T')[0];
    console.log(isoDateString);
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

    console.log(this.addAppointment.date);
    this.addAppointment.date = utcSelectedDate.toISOString();
    console.log('after', this.addAppointment.date);

    //get timeslots
    this.appService
      .getAllAppointments()
      .subscribe((appointments: Appointment[]) => {
        console.log('getting all appointments');
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

    console.log('Adding Appointment');
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
      (response) => {
        console.log('Appointment added successfully:', response);
        this.router.navigate(['/appt-info'], {
          state: { state: this.addAppointment },
        });
      },
      (error) => {
        console.error('Error adding appointment:', error);
      }
    );
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
    console.log(selectedValue);
    this.addAppointment.persons = parseInt(selectedValue);
    this.showCalendarFlag = this.addAppointment.persons != null;
    console.log(this.addAppointment.persons);
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
    console.log('before clicking', this.addAppointment.date);
    const appointmentDate = new Date(this.addAppointment.date);
    console.log(appointmentDate);

    // Adjust the hour based on AM/PM
    let adjustedHour = hour;
    if (amPm.toLowerCase() === 'pm' && hour !== 12) {
      adjustedHour += 12; // Add 12 hours for PM except for 12 PM
    } else if (amPm.toLowerCase() === 'am' && hour === 12) {
      adjustedHour = 0; // For 12 AM, set hour to 0
    }

    // Set the adjusted hour in UTC
    appointmentDate.setUTCHours(adjustedHour + 4);

    // Set the minutes and seconds to 0 in UTC
    appointmentDate.setUTCMinutes(0);
    appointmentDate.setUTCSeconds(0);

    // Format the updated date back into a string in ISO 8601 format
    const updatedDateString = appointmentDate.toISOString();

    console.log('the date in changeappt ', appointmentDate);

    // Update the date property of the addAppointment object with the updated date string
    this.addAppointment.date = updatedDateString;
    console.log('set hour: ', this.addAppointment.date);
    this.timeslotSelected = true;
    this.highlightTime(timeSlot);
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

    console.log('comparing');
    appointments.forEach((appointment) => {
      // if the day matches
      console.log(appointment.date);
      console.log(this.addAppointment.date);
      console.log('adding timeslots:\n');
      console.log(timeSlots);
      if (this.isSameDay(appointment.date, this.addAppointment.date)) {
        console.log('is the same day');
        const appointmentDate = new Date(appointment.date);

        // Add the appointment to the current timeslots
        const hour = appointmentDate.getHours();
        const timeSlotIndex = hour - 9;
        console.log(timeSlotIndex);
        timeSlots[timeSlotIndex].numAppt += appointment.persons;
      }
    });

    // indicate if timeslot does not have room
    timeSlots.forEach((timeslot) =>{
      if (timeslot.numAppt + this.addAppointment.persons > 10){
        timeslot.aboveCapacity = true;
      }
    })
    console.log('done comparing');

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
    console.log(timeStr);
    var enough = true;
    this.timeSlots.forEach((timeslot) => {
      console.log(timeslot);
      if (timeStr == timeslot.time) {
        console.log(this.addAppointment.persons, ' ', timeslot.numAppt);
        console.log(this.addAppointment.persons + timeslot.numAppt);
        enough = !(this.addAppointment.persons + timeslot.numAppt > 10);
      }
    });
    console.log(enough);
    return enough;
  }

  isAppointmentEmpty(appointment: Appointment): boolean {
    // Check if any of the properties are empty
    if (appointment.firstName.trim() === '') {
      this.fNameValid = false;
    }

    if (appointment.lastName.trim() === '') {
      this.lNameValid = false;
    }

    if (appointment.persons === 0) {
      this.numValid = false;
    }

    if (appointment.phone.trim() === '') {
      this.phoneValid = false;
    }

    if (appointment.email.trim() === '') {
      this.emailValid = false;
    }

    if (appointment.date.trim() === '') {
      this.dateValid = false;
    }

    // Return true if any property is empty, otherwise return false
    return (
      appointment.firstName.trim() === '' ||
      appointment.lastName.trim() === '' ||
      appointment.persons === 0 ||
      appointment.phone.trim() === '' ||
      appointment.email.trim() === '' ||
      appointment.date.trim() === '' ||
      this.timeslotSelected == false
    );
  }
}
