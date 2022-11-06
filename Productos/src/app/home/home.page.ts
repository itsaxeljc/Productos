import { Component } from '@angular/core';
import { Producto } from "../models/producto";
import { ProductoService } from "../services/producto.service";

//Routes
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public productos: Producto[];
  public producto: Producto;

  constructor(private productoService: ProductoService, private router: Router) {
    this.productos =  this.productoService.getProductos();
  }

  public removeProducto(pos: number){
    this.productoService.removeProducto(pos);
    this.productos = this.productoService.getProductos();
  }

  public getProductoById(id_producto: string){
    this.router.navigate(['/view-producto'], { 
      queryParams: {id: id_producto}
    });
  }

  public addProducto(){
    this.productoService.addProducto(this.producto);
    this.productos = this.productoService.getProductos();
  }

}
