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

  constructor(private productoService: ProductoService, private aroute: ActivatedRoute) {
    this.producto = {
      foto: "",
      nombre: "",
      description: "",
      precio: 0
    }
  }

  ngOnInit() {
    this.aroute.queryParams.subscribe((params) => {
      this.productoService.getProductoById(params.id).subscribe(item => {
        console.log(item);
        this.producto = item as Producto;
      });
    }
    );
  }

}
