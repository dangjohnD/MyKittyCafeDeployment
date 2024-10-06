import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/appointment.service';

@Component({
  selector: 'app-appt-summary',
  templateUrl: './appt-summary.page.html',
  styleUrls: ['./appt-summary.page.scss'],
})
export class ApptSummaryPage implements OnInit {

  appointmentInfo: any;
  formattedDateTime: any;

  // variables for payment
  paymentAmount: string = '0.01';
  currency: string = 'CAD';
  currencyIcon: string = '$';
  
  constructor(private router: Router, private appService: AppointmentService) {

    let _this = this;

    setTimeout(() => {
      // Render the PayPal button into #paypal-button div
      (window as any)['paypal'].Buttons({

        // Set up transaction - enter value
        createOrder: function (data: any, actions: any) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: (_this.appointmentInfo.persons * 10).toFixed(2)
              }
            }]
          });
        },

        // Happens when payment success
        onApprove: function (data: any, actions: any) {
          return actions.order.capture()
            .then(function (details: any) {
              // Show
              console.log(details);
              _this.appService.addAppointment(_this.appointmentInfo).subscribe(
                (response) => {
                  _this.router.navigate(['/appt-info'], {
                    state: { state: _this.appointmentInfo },
                  });
                },
                (error) => {
                  console.error('Error adding appointment:', error);
                }
              );
            })
            .catch((err: any) => {
              console.log(err);
            })
        }
      }).render('#paypal-button');
    }, 500)
  }

  ngOnInit() {
    this.appointmentInfo = this.router.getCurrentNavigation()?.extras.state;
    console.log(this.appointmentInfo);
    let inputDate = new Date(this.appointmentInfo.date);
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
  }

}
