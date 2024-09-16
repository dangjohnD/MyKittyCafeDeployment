import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Appointment } from 'src/app/appointment';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-appt-modal',
  templateUrl: './appt-modal.component.html',
  styleUrls: ['./appt-modal.component.scss'],
})
export class ApptModalComponent{

  @Input() selectedAppt!: Appointment;
  isDeleteConfirmed: boolean = false;
  isCheckboxDisabled: boolean = false;
  errorMessage: string = '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.isCheckboxDisabled = !this.isCancellationAllowed();
    if (this.isCheckboxDisabled){
      this.errorMessage = "You cannot delete this appointment because it is past" + 
      "the cancellation deadline or the confirmation checkbox is not checked.";
    }
  }

  isCancellationAllowed(): boolean {
    const currentDate = new Date();
    const appointmentDate = new Date(this.selectedAppt.date);

    // Set the cancellation deadline to one day before the appointment date
    const cancellationDeadline = new Date(appointmentDate);
    cancellationDeadline.setDate(cancellationDeadline.getDate() - 1);

    // Check if current date is past the cancellation deadline
    return currentDate <= cancellationDeadline;
  }

  async closeCorner(){
    await this.modalController.dismiss();
  }

  async closeModal() {

    if (this.isDeleteConfirmed && this.isCancellationAllowed()) {
      await this.modalController.dismiss({
        delete: this.isDeleteConfirmed,
        selectedAppt: this.selectedAppt
      });
    } else {
      this.errorMessage = 'You cannot delete this appointment because it is past the ' +
      'cancellation deadline or the confirmation checkbox is not checked.';
    }
  }
}
