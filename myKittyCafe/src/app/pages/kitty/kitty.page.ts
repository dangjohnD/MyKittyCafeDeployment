import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cat } from 'src/app/cat';
import { CatService } from 'src/app/cat.service';
import { KittyModalComponent } from 'src/app/components/kitty-modal/kitty-modal.component';

@Component({
  selector: 'app-kitty',
  templateUrl: './kitty.page.html',
  styleUrls: ['./kitty.page.scss'],
})
export class KittyPage implements OnInit {

  colourOptions = ['Black', 'White', 'Grey', 'Calico', 'Brown', 'Hairless', 'Orange'];
  kitties: Cat[] = [
    {
      name: 'Ryan',
      colour: 'Orange',
      birthday: new Date(),
      desc: '',
      isDisabled: false,
      image: 'https://publicstoragemkc.blob.core.windows.net/demoblob/img.png',
      note: ''
    },
    {
      name: 'Ryan but Disabled',
      colour: 'Black',
      birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 6)),
      desc: '',
      isDisabled: true,
      image: 'https://publicstoragemkc.blob.core.windows.net/demoblob/testUpload.png',
      note: 'Has FIV and AIDS'
    },{
      name: 'Calico Joe',
      colour: 'Calico',
      birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 3)), // 3 years old
      desc: '',
      isDisabled: false,
      image: 'https://publicstoragemkc.blob.core.windows.net/demoblob/img.png',
      note: ''
    },
    {
      name: 'Ryan',
      colour: 'Orange',
      birthday: new Date(),
      desc: '',
      isDisabled: false,
      image: 'https://publicstoragemkc.blob.core.windows.net/demoblob/img.png',
      note: ''
    }
  ];
  filteredKitties: Cat[] = [];
  selectedColour: string = '';
  sortByAge: string = '';


  constructor(private modalController: ModalController, private catService: CatService) {
    this.filteredKitties = this.kitties;
   }

  ngOnInit() {
  }


  filterKitties() {
    this.filteredKitties = this.kitties.filter(kitty => {
      return this.selectedColour ? kitty.colour === this.selectedColour : true; // Filter by selected color
    });
    this.sortKitties(); // Sort after filtering
  }

  sortKitties() {
    if (this.sortByAge === 'desc') {
      this.filteredKitties.sort((a, b) => new Date(a.birthday).getTime() - new Date(b.birthday).getTime());
    } else if (this.sortByAge === 'asc') {
      this.filteredKitties.sort((a, b) => new Date(b.birthday).getTime() - new Date(a.birthday).getTime());
    }
  }

  async openKittyModal(kitty: Cat) {
    const modal = await this.modalController.create({
      component: KittyModalComponent,
      componentProps: { 
        mode: 'view',
        kitty: kitty 
      }
    });
    return await modal.present();
  }

  async addKitty() {
    const modal = await this.modalController.create({
      component: KittyModalComponent,
      componentProps: {
        mode: 'add', // Set mode to 'add' for adding a new kitty
        kitty: {
          name: '',
          colour: '',
          birthday: new Date(),
          desc: '',
          isDisabled: false,
          note: '',
          image: ''
        } as Cat
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        console.log('save');
        console.log(data.data);
        var newCat = data.data 
        if (newCat.image !== '') {
          const base64Image = newCat.image; // Assuming newCat.image is the base64 string
          const filename = 'img.png'; // or use a dynamic name if needed
        
          // Extract the MIME type and base64 string
          const arr = base64Image.split(',');
          const mime = arr[0].match(/:(.*?);/)[1]; // Extract MIME type
          const bstr = atob(arr[1]); // Decode base64 string
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
        
          // Create a byte array from the decoded base64 string
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
        
          // Create a Blob from the byte array
          const blob = new Blob([u8arr], { type: mime });
        
          // Create a File object from the Blob
          const file = new File([blob], filename, { type: mime });
        
          // Upload the file using the service
          this.catService.uploadFile(file, filename).subscribe(
            (response) => {
              console.log('Upload successful', response);
            },
            (error) => {
              console.error('Upload failed', error);
            }
          );
        }
  
      }else{
        console.log('no save');
      }
    });

    return await modal.present();
  }

}
