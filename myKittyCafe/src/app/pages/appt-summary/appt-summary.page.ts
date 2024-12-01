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

  
  constructor(private router: Router, private appService: AppointmentService) {

    let _this = this;

    setTimeout(() => {
      // Render the PayPal button into #paypal-button div
      (window as any)['paypal'].Buttons({

        // Set up transaction - enter value
        createOrder: function (data: any, actions: any) {
          const unitPrice = 10.00; // Price per person
          const quantity = _this.appointmentInfo.persons; // Number of persons
          const totalAmount = (unitPrice * quantity).toFixed(2); // Total amount for the order
        
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: "CAD", // Specify your currency
                value: totalAmount,
                breakdown: {
                  item_total: {
                    currency_code: "CAD",
                    value: totalAmount // Item total should match the value
                  }
                }
              },
              items: [
                {
                  name: "Person(s) in My Kitty Cafe Appointment",
                  unit_amount: {
                    currency_code: "CAD",
                    value: unitPrice.toFixed(2) // Price per person
                  },
                  quantity: quantity.toString() // Convert quantity to string
                }
              ]
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
    inputDate.setUTCHours(inputDate.getUTCHours() + 5);

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

  goBackToBooking() {
    this.router.navigate(['/booking'], { replaceUrl: true });
  }
}