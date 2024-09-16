import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { ApptModalComponent } from './appt-modal/appt-modal.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [InfoComponent, ApptModalComponent],
  imports: [
    CommonModule, FormsModule, IonicModule
  ],
  exports:[
    InfoComponent,ApptModalComponent
  ]
})
export class ComponentsModule { }
