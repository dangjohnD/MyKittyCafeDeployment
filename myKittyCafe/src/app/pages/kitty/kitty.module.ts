import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KittyPageRoutingModule } from './kitty-routing.module';

import { KittyPage } from './kitty.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KittyPageRoutingModule
  ],
  declarations: [KittyPage]
})
export class KittyPageModule {}
