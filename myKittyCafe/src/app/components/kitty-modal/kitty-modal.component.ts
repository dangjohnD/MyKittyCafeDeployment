import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { Cat } from 'src/app/cat';

@Component({
  selector: 'app-kitty-modal',
  templateUrl: './kitty-modal.component.html',
  styleUrls: ['./kitty-modal.component.scss'],
})
export class KittyModalComponent  implements OnInit {

  @Input() mode: 'view' | 'add' | 'edit' = 'view'; // Mode of the modal
  @Input() kitty: Cat = {
    name: '',
    colour: '',
    birthday: new Date(),
    desc: '',
    disabled: false,
    image: '',
    note: ''
  };
  colourOptions = ['Black', 'White', 'Grey', 'Calico', 'Brown', 'Hairless', 'Orange'];
  
  ngOnInit() {
    console.log(this.kitty);
  }
  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const maxFileSize = 4 * 1024 * 1024; // Max size = 4mb
      const allowedFileTypes = ['image/jpeg', 'image/png'];

      // Alert if not jpeg or png
      if (!allowedFileTypes.includes(file.type)) {
        alert('Only JPEG and PNG images are allowed.');
        input.value = '';
        return;
      }

      // Validate file size
      if (file.size > maxFileSize) {
        alert('File size exceeds the 4 MB limit.');
        input.value = '';
        return;
      }

      const reader = new FileReader();

      reader.onload = (e: any) => {
        // Set the kitty image property to the uploaded image data
        this.kitty.image = e.target.result; // turn it into base64 string
      };

      reader.readAsDataURL(file); // Read the file as a base64 string
    }
  }
  validateFields(): boolean {
    const today = new Date();
    const thirtyYearsAgo = new Date();
    thirtyYearsAgo.setFullYear(today.getFullYear() - 30);

    if (!this.kitty.name) {
      alert('Name is required.');
      return false;
    }
    if (!this.kitty.colour) {
      alert('Colour is required.');
      return false;
    }
    if (!this.kitty.birthday || this.kitty.birthday > today) {
      alert('Birthday cannot be in the future.');
      return false;
    }
    if (this.kitty.birthday < thirtyYearsAgo) {
      alert('Birthday cannot be older than 30 years.');
      return false;
    }
    return true;
  }

  saveKitty() {
    if (this.validateFields()) {
      this.modalController.dismiss(this.kitty); // Pass the kitty data back if valid
    }
  }

  editKitty(){
    if (this.validateFields()) {
      this.modalController.dismiss({ action: 'edit', data: this.kitty });
    }
  }

  deleteKitty(){
    this.modalController.dismiss({ action: 'delete', data: this.kitty });
  }
}
