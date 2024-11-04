import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { ApptModalComponent } from './appt-modal/appt-modal.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { KittyModalComponent } from './kitty-modal/kitty-modal.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [InfoComponent, ApptModalComponent, KittyModalComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule
  ],
  exports:[
    InfoComponent,ApptModalComponent, KittyModalComponent
  ]
})
export class ComponentsModule { }
