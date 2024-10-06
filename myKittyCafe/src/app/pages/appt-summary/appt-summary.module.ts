import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApptSummaryPageRoutingModule } from './appt-summary-routing.module';

import { ApptSummaryPage } from './appt-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApptSummaryPageRoutingModule
  ],
  declarations: [ApptSummaryPage]
})
export class ApptSummaryPageModule {}
