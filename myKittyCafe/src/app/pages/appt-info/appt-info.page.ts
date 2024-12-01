import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appt-info',
  templateUrl: './appt-info.page.html',
  styleUrls: ['./appt-info.page.scss'],
})
export class ApptInfoPage implements OnInit {
  appointmentInfo: any;
  formattedDateTime: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.appointmentInfo = this.router.getCurrentNavigation()?.extras.state;
    let inputDate = new Date(this.appointmentInfo.state.date);
    inputDate.setUTCHours(inputDate.getUTCHours() + 4);

    let formattedDate = inputDate.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    let formattedTime = inputDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    });


    this.formattedDateTime = `${formattedDate}, ${formattedTime}`;
  }
}
