import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { Total } from '../models/total';
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
  public total: Total = {
    total: 0
  };

  constructor(private productoService: ProductoService,  private router: Router,
    private alertController:AlertController ) { 
      this.getCarrito();
      this.getTotal();
  }

  ngOnInit() {
  }

  public async removeProducto(producto: Producto) {
    const alert = await this.alertController.create({
      header: 'ALERTA',
      subHeader: '¿Estás seguro que deseas eliminar el producto?',
      message: 'Al eliminar no se podra visualizar el producto',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.productoService.removeProductoCarrito(producto.id);
            this.productoService.updateTotal(producto.precio * -1, this.total);
          }
        }
      ]
    });
    await alert.present();
  }

  getCarrito(){
    this.productoService.getCarrito().subscribe( res => {
      this.productos = res;
    });
  }

  getTotal(){
    this.productoService.getTotal().subscribe( res => {
      this.total = res[0];
    })
  }

}
