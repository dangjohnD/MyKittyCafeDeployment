import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdoptPage } from './adopt.page';

const routes: Routes = [
  {
    path: '',
    component: AdoptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdoptPageRoutingModule {}
