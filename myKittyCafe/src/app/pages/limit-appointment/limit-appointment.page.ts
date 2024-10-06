import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/appointment';
import { AppointmentService } from 'src/app/appointment.service';
import { ApptLimitService } from 'src/app/appt-limit.service';
import { apptLimit } from 'src/app/apptLimit';
import { TimeSlot } from 'src/app/timeslot';
import { forkJoin } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-limit-appointment',
  templateUrl: './limit-appointment.page.html',
  styleUrls: ['./limit-appointment.page.scss'],
})
export class LimitAppointmentPage implements OnInit {

  currentLimit: apptLimit = {
    date: '',
    limit: 0
  }

  selectedLimit: number = 10;
  selectedDate: any;
  selectedDay: any;
  dateValid: boolean = true;
  minDate: string;
  timeSlots: TimeSlot[] = [];
  showCalendarFlag: boolean = true;
  timeslotSelected: boolean = false;
  selectedTimeslot!: TimeSlot;

  invalidLimit: boolean = false;

  constructor(private appService: AppointmentService, private router: Router,
    private apptLimitService: ApptLimitService, private toastController: ToastController) {
    const dateNow = new Date();
    dateNow.setUTCHours(dateNow.getUTCHours());
    const isoDateString = dateNow.toISOString().split('T')[0];
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

    utcSelectedDate.setUTCHours(0);
    utcSelectedDate.setMinutes(0);
    this.selectedDay = utcSelectedDate;
    this.selectedDate = utcSelectedDate.toISOString();

    // Get timeslots and limits
    this.appService.getAllAppointments().subscribe((appointments: Appointment[]) => {
      this.timeSlots = this.getTimeSlots(appointments);

      // Fetch limits for all timeslots and update their limits
      this.fetchAllLimitsForTimeslots();
    });
  }

  fetchAllLimitsForTimeslots() {
    const limitRequests = this.timeSlots.map((timeslot) => {
      const time = this.convertTo24Hour(timeslot.time);
      const dateTime = new Date(this.selectedDay);
      dateTime.setUTCHours(time);
      const dateTimeString = dateTime.toISOString();
      return this.apptLimitService.getApptLimitByDate(dateTimeString);
    });

    forkJoin(limitRequests).subscribe(
      (limits: apptLimit[]) => {
        limits.forEach((limit, index) => {
          if (limit) {
            this.timeSlots[index].limit = limit.limit;
          }
        });

        // Check above capacity after fetching limits
        this.timeSlots.forEach(timeslot => {
          if (timeslot.numAppt > timeslot.limit) {
            timeslot.aboveCapacity = true;
          }
        });
      },
      (error) => {
        console.error('Error fetching limits: ', error);
      }
    );
  }

  getTimeSlots(appointments: Appointment[]): TimeSlot[] {
    const timeSlots: TimeSlot[] = [];
    for (let hour = 9; hour <= 11; hour++) {
      timeSlots.push({
        time: hour + ' am',
        numAppt: 0,
        isSelected: false,
        aboveCapacity: false,
        limit: 10
      });
    }
    for (let hour = 12; hour <= 17; hour++) {
      const time = hour > 12 ? hour - 12 + ' pm' : hour + ' pm';
      timeSlots.push({
        time,
        numAppt: 0,
        isSelected: false,
        aboveCapacity: false,
        limit: 10
      });
    }

    if (!appointments) return timeSlots;

    appointments.forEach(appointment => {
      if (this.isSameDay(appointment.date, this.selectedDate)) {
        const appointmentDate = new Date(appointment.date);
        const hour = appointmentDate.getHours() + 4;
        const timeSlotIndex = hour - 9;
        if (timeSlotIndex >= 0 && timeSlotIndex < timeSlots.length) {
          timeSlots[timeSlotIndex].numAppt += appointment.persons;
        }
      }
    });

    return timeSlots;
  }

  isSameDay(dateString1: string, dateString2: string): boolean {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
    return date1.getUTCFullYear() === date2.getUTCFullYear() &&
      date1.getUTCMonth() === date2.getUTCMonth() &&
      date1.getUTCDate() === date2.getUTCDate();
  }

  selectTimeSlot(timeSlot: TimeSlot) {
    this.selectedTimeslot = timeSlot;
    const appointmentDate = new Date(this.selectedDate);
    const timeParts = timeSlot.time.split(' ');
    const hour = parseInt(timeParts[0]);
    const amPm = timeParts[1];

    let adjustedHour = hour;
    if (amPm.toLowerCase() === 'pm' && hour !== 12) {
      adjustedHour += 12;
    } else if (amPm.toLowerCase() === 'am' && hour === 12) {
      adjustedHour = 0;
    }

    appointmentDate.setUTCHours(adjustedHour);
    appointmentDate.setUTCMinutes(0);
    appointmentDate.setUTCSeconds(0);

    this.currentLimit.date = appointmentDate.toISOString();
    this.timeslotSelected = true;
    this.highlightTime(timeSlot.time)
    timeSlot.isSelected = true;
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

  addLimit() {

    if (!this.timeslotSelected){
      return;
    }

    if (this.selectedLimit < this.selectedTimeslot.numAppt) {
      this.invalidLimit = true;
      return;
    }
    this.currentLimit.limit = this.selectedLimit;

    this.apptLimitService.addAppointmentLimit(this.currentLimit).subscribe(
      (response) => {
        this.presentSuccessToast();
      },
      (error) => {
        console.error('Error adding limit:', error);
      }
    );

    // Refresh the timeslots shown
    this.fetchAllLimitsForTimeslots();
  }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Limit added successfully!',
      duration: 2000,
      color: 'success',
      position: 'top',
    });
    toast.present();
  }

  convertTo24Hour(timeString: string): number {
    const [time, period] = timeString.split(' ');
    let hour = parseInt(time);
    if (period.toLowerCase() === 'pm' && hour !== 12) {
      hour += 12;
    } else if (period.toLowerCase() === 'am' && hour === 12) {
      hour = 0;
    }
    return hour;
  }
}
