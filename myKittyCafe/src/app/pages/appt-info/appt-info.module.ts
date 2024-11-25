import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApptInfoPageRoutingModule } from './appt-info-routing.module';

import { ApptInfoPage } from './appt-info.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApptInfoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ApptInfoPage]
})
export class ApptInfoPageModule {}
