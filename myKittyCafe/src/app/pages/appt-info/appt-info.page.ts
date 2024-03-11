import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appt-info',
  templateUrl: './appt-info.page.html',
  styleUrls: ['./appt-info.page.scss'],
})
export class ApptInfoPage implements OnInit {

  appointmentInfo: any;

  constructor(private router: Router) {}
  
  ngOnInit() {
      this.appointmentInfo = this.router.getCurrentNavigation()?.extras.state;
      console.log(this.appointmentInfo)
  }

}
