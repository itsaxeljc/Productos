import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';

//Routes
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {

  public producto: Producto;

  constructor(private productoService: ProductoService, private aroute: ActivatedRoute) { }

  ngOnInit() {
    this.aroute.queryParams.subscribe(
      (params) => {
        this.producto = this.productoService.getProductoById(params.id);
      }
    );
  }

}
