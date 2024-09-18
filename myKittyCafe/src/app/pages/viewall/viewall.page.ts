import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Appointment } from 'src/app/appointment';
import { AppointmentService } from 'src/app/appointment.service';
import { AuthService } from 'src/app/auth.service';
import { ApptModalComponent } from 'src/app/components/appt-modal/appt-modal.component';

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
      private authService: AuthService,
      private modalController: ModalController,
      private toastController: ToastController) {}

  ngOnInit(): void {
    this.authService.asObserver.subscribe(
      message => { this.userType = message}
    );
    console.log(this.userType);
    if (this.userType != 'admin@gmail.com' && this.userType){
      console.log("getting user appts")
      this.loadUserAppointments();
      console.log(this.filteredAppointments);
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
    if (this.userType == "admin@gmail.com"){
      this.loadAppointments();
    }else{
    }

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
    console.log("filtered");
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

  // Open the appointment dialog to
  async openAppointmentModal(id: Number | undefined){
    
    //Grab appointment that's being deleted
    console.log(id);
    var selectedAppt = this.filteredAppointments.find(appointment => appointment.id === id);
    console.log(selectedAppt);

    const modal = await this.modalController.create({
      component: ApptModalComponent,
      componentProps: { selectedAppt }
    });
  
    // on confirmation delete via service
    modal.onDidDismiss().then((result) => {
      if (result.data != undefined){
        if (result.data.delete) {
          this.deleteAppointment(result.data.selectedAppt.id);
        }
      }
    });
  
    return await modal.present();
  }

  async deleteAppointment(appointmentId: number) {
    // Delete and show message
    console.log("delete appt: " + appointmentId);
    this.appointmentService.deleteAppointmentById(appointmentId).subscribe(
      response => {
        console.log('Deletion successful:', response);
      },
      error => {
        console.error('Deletion failed:', error);
      }
    );
    await this.presentToast();
    // Refresh the list of appointments
    this.loadUserAppointments();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Appointment deleted, email sent to user.',
      duration: 5000, // Duration in milliseconds
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }
}
