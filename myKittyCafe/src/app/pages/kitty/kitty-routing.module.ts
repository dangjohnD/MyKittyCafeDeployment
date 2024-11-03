import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KittyPage } from './kitty.page';

const routes: Routes = [
  {
    path: '',
    component: KittyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KittyPageRoutingModule {}
