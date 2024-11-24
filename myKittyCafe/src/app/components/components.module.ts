import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { ApptModalComponent } from './appt-modal/appt-modal.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { KittyModalComponent } from './kitty-modal/kitty-modal.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [InfoComponent, ApptModalComponent, KittyModalComponent, FooterComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule
  ],
  exports:[
    InfoComponent,ApptModalComponent, KittyModalComponent, FooterComponent
  ]
})
export class ComponentsModule { }
