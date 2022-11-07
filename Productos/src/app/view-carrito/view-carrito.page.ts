import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import { AlertController } from '@ionic/angular';

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

  constructor(private productoService: ProductoService,  private router: Router,
    private alertController:AlertController ) { 
  }

  ngOnInit() {
    this.productos = this.productoService.getCarrito();
    this.total = this.productoService.getTotal();
  }

  public async removeProducto(pos: number){
    
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
            
            this.total = this.productoService.removeProductoCarrito(pos);
            this.productos = this.productoService.getCarrito();
            
          }
        }
      ]
    });

    await alert.present();

  }

}
