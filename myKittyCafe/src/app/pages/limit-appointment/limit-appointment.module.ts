import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LimitAppointmentPageRoutingModule } from './limit-appointment-routing.module';

import { LimitAppointmentPage } from './limit-appointment.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LimitAppointmentPageRoutingModule,
    ComponentsModule
  ],
  declarations: [LimitAppointmentPage]
})
export class LimitAppointmentPageModule {}
