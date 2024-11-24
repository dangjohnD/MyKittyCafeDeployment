import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminBoardPageRoutingModule } from './admin-board-routing.module';

import { AdminBoardPage } from './admin-board.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminBoardPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminBoardPage]
})
export class AdminBoardPageModule {}
