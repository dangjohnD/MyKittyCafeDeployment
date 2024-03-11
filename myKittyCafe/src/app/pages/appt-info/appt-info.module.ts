import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApptInfoPageRoutingModule } from './appt-info-routing.module';

import { ApptInfoPage } from './appt-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApptInfoPageRoutingModule
  ],
  declarations: [ApptInfoPage]
})
export class ApptInfoPageModule {}
