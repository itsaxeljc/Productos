import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { AlertController } from '@ionic/angular';
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
  private carrito: Producto[];

  constructor(private productoService: ProductoService, private router: Router,
    private alertController: AlertController) {
    this.productoService.getCarrito().subscribe(res => {
      this.productos = res;
      this.carrito = [];
      this.total = 0;
      console.log(this.producto);
      this.productos.forEach(i => this.total+=(i.precio));
    });
    //this.total = this.productoService.getTotal();
  }

  ngOnInit() {
  }

  public removeProducto(id: string) {
    this.productoService.removeProductoCarrito(id);
  }
  public getTotal(producto: Producto): number{
    this.total = this.total + producto.precio;
    return this.total;
  }
  /*public async removeProducto(id:string){
    
    const alert = await this.alertController.create({
      header: 'ALERTA',
      subHeader: '¿Estás seguro que deseas eliminar el producto?',
      message: 'Al eliminar no se podra visualizar el producto',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            
            this.productoService.removeProductoCarrito(id);
            
            
          }
        }
      ]
    });

    await alert.present();

  }*/

}
