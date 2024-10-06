import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminBoardPageRoutingModule } from './admin-board-routing.module';

import { AdminBoardPage } from './admin-board.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminBoardPageRoutingModule
  ],
  declarations: [AdminBoardPage]
})
export class AdminBoardPageModule {}
