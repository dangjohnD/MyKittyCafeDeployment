import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApptSummaryPageRoutingModule } from './appt-summary-routing.module';

import { ApptSummaryPage } from './appt-summary.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApptSummaryPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ApptSummaryPage]
})
export class ApptSummaryPageModule {}
