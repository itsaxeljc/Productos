import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';

//Routes
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-view-carrito',
  templateUrl: './view-carrito.page.html',
  styleUrls: ['./view-carrito.page.scss'],
})
export class ViewCarritoPage implements OnInit {

  public productos: Producto[];
  public producto: Producto;
  public total: number;

  constructor(private productoService: ProductoService,  private router: Router) { }

  ngOnInit() {
    this.productos = this.productoService.getCarrito();
  }

  public removeProducto(pos: number){
    this. total = this.productoService.removeProductoCarrito(pos);
    this.productos = this.productoService.getCarrito();
  }

  public addProducto(producto: Producto){
    this.total =  this.productoService.addProductoCarrito(producto);
    this.productos = this.productoService.getCarrito();
  }

}
