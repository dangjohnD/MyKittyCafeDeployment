import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cat } from 'src/app/cat';
import { CatService } from 'src/app/cat.service';
import { KittyModalComponent } from 'src/app/components/kitty-modal/kitty-modal.component';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-kitty',
  templateUrl: './kitty.page.html',
  styleUrls: ['./kitty.page.scss'],
})
export class KittyPage implements OnInit {

  colourOptions = ['Black', 'White', 'Grey', 'Calico', 'Brown', 'Hairless', 'Orange'];
  kitties: Cat[] = [];
  filteredKitties: Cat[] = [];
  selectedColour: string = '';
  sortByAge: string = '';
  userType!: any;

  constructor(private modalController: ModalController, private catService: CatService,
    private toastController: ToastController, private authService: AuthService) {
    this.filteredKitties = this.kitties;
   }

  ngOnInit() {
    this.authService.asObserver.subscribe(
      message => { this.userType = message}
    );
    this.loadCats();
  }

  ionViewDidEnter(){
    this.loadCats();
  }

  filterKitties() {
    if (this.selectedColour == ''){
      this.loadCats();
    }
    this.filteredKitties = this.kitties.filter(kitty => {
      return this.selectedColour ? kitty.colour === this.selectedColour : true; // Filter by selected color
    });
    this.sortKitties(); // Sort after filtering
  }

  loadCats(){
    this.catService.getAllCats().subscribe(
      (cats: Cat[]) => {
        console.log("cats gotten")
        this.kitties = cats;
        this.filteredKitties = cats;
      },
      (error) => {
        console.error('Error fetching appointments: ', error);
      }
    );
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

  // Admin Options
  async openKittyModalAdmin(kitty: Cat){
    const modal = await this.modalController.create({
      component: KittyModalComponent,
      componentProps: { 
        mode: 'edit',
        kitty: kitty 
      }
    });
    
    modal.onDidDismiss().then((result) => {
      const { action, data } = result.data || {};
  
      var kitty = data;
      if (action === 'edit' && data) {
        this.updateKitty(data);
        this.loadCats()
        this.filterKitties();
      } else if (action === 'delete' && data) {
        this.loadCats()
        this.deleteKitty(kitty);
        this.filterKitties();
      }
    });

    return await modal.present();
  }

  deleteKitty(kitty: Cat){
    this.catService.deleteCatById(kitty.id!).subscribe(
      (response) => {
      this.presentSuccessToast("Kitty has been deleted");
      this.loadCats();
      },
      (error) => {
        console.error('Add Cat failed', error)
      }
    )
  }

  updateKitty(kitty: Cat){

    if (kitty.image !== '' && !(kitty.image.toString().startsWith('https://publicstoragemkc'))) {
      const base64Image = kitty.image.toString(); // Currently base64 string
      const filename = kitty.name + kitty.birthday;
    
      // Extract the MIME type and base64 string
      const arr = base64Image.split(',');
      const mime = arr[0].match(/:(.*?);/)![1]; // Extract MIME type
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
          console.log("image uploaded");
          kitty.image = 'https://publicstoragemkc.blob.core.windows.net/demoblob/' + filename;
          this.catService.updateCat(kitty).subscribe(
            (response) => {
            this.presentSuccessToast("Kitty has been updated");
            this.loadCats()
            },
            (error) => {
              console.error('update cat failed', error)
            }
        );

        },
        (error) => {
          console.error('Upload failed', error);
        }
      );
    }else{// no image selected
      this.catService.updateCat(kitty).subscribe(
        (response) => {
        this.presentSuccessToast("Kitty has been updated");
        this.loadCats()
        this.filterKitties();
        },
        (error) => {
          console.error('Update Cat failed', error)
        }
      )
    }
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
          disabled: false,
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
          const base64Image = newCat.image; // Currently base64 string
          const filename = newCat.name + newCat.birthday;
        
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
              console.log(newCat);
              newCat.image = 'https://publicstoragemkc.blob.core.windows.net/demoblob/' + filename;
              this.catService.addCat(newCat).subscribe(
                (response) => {
                this.presentSuccessToast("Kitty has been added");
                this.loadCats();
                this.filterKitties();
                },
                (error) => {
                  console.error('add cat failed', error)
                }
            );

            },
            (error) => {
              console.error('Upload failed', error);
            }
          );
        }else{// no image selected
          this.catService.addCat(newCat).subscribe(
            (response) => {
            this.presentSuccessToast("Kitty has been added");
            this.loadCats();
            this.filterKitties();
            },
            (error) => {
              console.error('Add Cat failed', error)
            }
          )
        }

      }else{// no data returned 
      }

      
    });

    return await modal.present();
  }


  async presentSuccessToast(msg: String) {
    const toast = await this.toastController.create({
      message: 'Success: ' + msg,
      duration: 2000,
      color: 'success',
      position: 'top',
    });
    toast.present();
  }

}
