import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCarritoPage } from './view-carrito.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCarritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCarritoPageRoutingModule {}
