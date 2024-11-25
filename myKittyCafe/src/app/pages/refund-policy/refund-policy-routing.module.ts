import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefundPolicyPage } from './refund-policy.page';

const routes: Routes = [
  {
    path: '',
    component: RefundPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefundPolicyPageRoutingModule {}
