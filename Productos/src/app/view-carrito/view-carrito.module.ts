import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCarritoPageRoutingModule } from './view-carrito-routing.module';

import { ViewCarritoPage } from './view-carrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCarritoPageRoutingModule
  ],
  declarations: [ViewCarritoPage]
})
export class ViewCarritoPageModule {}
