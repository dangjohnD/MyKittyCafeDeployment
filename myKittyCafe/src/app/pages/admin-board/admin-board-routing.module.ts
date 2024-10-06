import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminBoardPage } from './admin-board.page';

const routes: Routes = [
  {
    path: '',
    component: AdminBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminBoardPageRoutingModule {}
