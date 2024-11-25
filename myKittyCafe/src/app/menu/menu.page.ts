import { Component, OnInit } from '@angular/core';
import { MENU } from './menu-data';
import { ComponentsModule } from '../components/components.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  menu = MENU;
  constructor() { }

  ngOnInit() {
  }

}
