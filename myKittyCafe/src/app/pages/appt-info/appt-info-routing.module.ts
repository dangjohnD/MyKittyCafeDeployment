import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApptInfoPage } from './appt-info.page';

const routes: Routes = [
  {
    path: '',
    component: ApptInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApptInfoPageRoutingModule {}
