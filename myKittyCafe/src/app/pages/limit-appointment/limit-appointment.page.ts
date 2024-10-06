import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/appointment';
import { AppointmentService } from 'src/app/appointment.service';
import { ApptLimitService } from 'src/app/appt-limit.service';
import { apptLimit } from 'src/app/apptLimit';
import { TimeSlot } from 'src/app/timeslot';

@Component({
  selector: 'app-limit-appointment',
  templateUrl: './limit-appointment.page.html',
  styleUrls: ['./limit-appointment.page.scss'],
})
export class LimitAppointmentPage implements OnInit {

  currentLimit: apptLimit = {
    date:'',
    limit: 0
  }

  selectedLimit: number = 10;

  selectedDate: any;
  dateValid: boolean = true;
  minDate: string;
  timeSlots: TimeSlot[] = [];
  showCalendarFlag: boolean = true;
  timeslotSelected: boolean = false;
  selectedTimeslot!: TimeSlot;

  invalidLimit: boolean = false;

  constructor(private appService: AppointmentService, private router: Router,
    private apptLimitService: ApptLimitService) {
    // Get the current date and time in UTC
    const dateNow = new Date();
    
    // Adjust the current date and time to Eastern Daylight Time (EDT, UTC-4)
    dateNow.setUTCHours(dateNow.getUTCHours());

    // Get the date part in ISO format (YYYY-MM-DD)
    const isoDateString = dateNow.toISOString().split('T')[0];

    // Set the minimum date for the component
    this.minDate = isoDateString;
  }

  ngOnInit() {
  }

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
  
  this.selectedDate = utcSelectedDate.toISOString();

  //get timeslots
  this.appService
    .getAllAppointments()
    .subscribe((appointments: Appointment[]) => {
      this.timeSlots = this.getTimeSlots(appointments);
    });
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
      if (this.isSameDay(appointment.date, this.selectedDate)) {
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
      if (timeslot.numAppt > 10){
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

  selectTimeSlot(timeSlot: TimeSlot) {
    this.selectedTimeslot = timeSlot;

    var timeSlottime = timeSlot.time;
    const timeParts = timeSlottime.split(' '); // Split the time slot string into parts
    const hour = parseInt(timeParts[0]); // Extract the hour from the first part
    const amPm = timeParts[1]; // Extract AM/PM from the second part

    // Parse the existing date string into a Date object
    console.log("This is selectedDate" + this.selectedDate);
    const appointmentDate = new Date(this.selectedDate);

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
    console.log(appointmentDate);
    const updatedDateString = appointmentDate.toISOString();
    console.log(updatedDateString);


    // Update the date property of the addAppointment object with the updated date string
    this.selectedDate = updatedDateString;
    this.currentLimit.date = updatedDateString;
    this.timeslotSelected = true;
    timeSlot.isSelected = true;
    console.log(this.selectedDate)
  }

    addLimit(){

      if (this.selectedLimit < this.selectedTimeslot.numAppt){
        this.invalidLimit = true;
        return;
      }
      this.currentLimit.limit = this.selectedLimit;

      this.apptLimitService.addAppointmentLimit(this.currentLimit).subscribe(
        (response) => {
          console.log("limit added");
        },
        (error) => {
          console.error('Error adding limit:', error);
        }
      );

    }
}
