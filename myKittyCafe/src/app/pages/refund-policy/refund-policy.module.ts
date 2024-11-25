import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RefundPolicyPageRoutingModule } from './refund-policy-routing.module';

import { RefundPolicyPage } from './refund-policy.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RefundPolicyPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RefundPolicyPage]
})
export class RefundPolicyPageModule {}
