import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private products: Producto[];
  private carrito: Producto[];
  private total: number;

  constructor() { 
      this.products =  [{
        foto: "https://picsum.photos/id/310/500/500",
        description: "Producto 1",
        precio: 25,
        id: "1"
      },
      {
        foto: "https://picsum.photos/id/317/500/500",
        description: "Producto 2",
        precio: 35,
        id: "2"
      },{
        foto: "https://picsum.photos/id/320/500/500",
        description: "Producto 3",
        precio: 65,
        id: "3"
      },{
        foto: "https://picsum.photos/id/390/500/500",
        description: "Producto 4",
        precio: 15,
        id: "4"
      },];
      this.carrito = [];
      this.total = 0;
  }

  public getProductos(): Producto[]{
    return this.products;
  }

  public addProducto(producto: Producto){
    this.products.push(producto);
  }

  public removeProducto(pos: number){
    this.products.splice(pos, 1);
  }

  public addProductoCarrito(producto: Producto):number{
    this.carrito.push(producto);
    this.total = this.total + producto.precio;
    return this.total;
  }

  public removeProductoCarrito(index: number): number{
    this.total =  this.total - this.carrito[index].precio;
    this.carrito.splice(index, 1);
    return this.total;
  }

  public getCarrito(): Producto[]{
    return this.carrito;
  }

  public getTotal(): number{
    return this.total;
  }

  public getProductoById (id: string): Producto{
    let item: Producto;
    item = this.products.find(
      (product)=> { 
        return product.id === id;
      }
    );
    return item;
  }

}