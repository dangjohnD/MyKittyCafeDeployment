import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule, FormsModule, IonicModule
  ],
  exports:[
    InfoComponent
  ]
})
export class ComponentsModule { }
