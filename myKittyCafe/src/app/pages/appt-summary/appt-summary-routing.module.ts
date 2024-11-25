import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApptSummaryPage } from './appt-summary.page';

const routes: Routes = [
  {
    path: '',
    component: ApptSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApptSummaryPageRoutingModule {}
