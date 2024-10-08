import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RefundPolicyPageRoutingModule } from './refund-policy-routing.module';

import { RefundPolicyPage } from './refund-policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RefundPolicyPageRoutingModule
  ],
  declarations: [RefundPolicyPage]
})
export class RefundPolicyPageModule {}
