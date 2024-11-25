import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LimitAppointmentPage } from './limit-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: LimitAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LimitAppointmentPageRoutingModule {}
