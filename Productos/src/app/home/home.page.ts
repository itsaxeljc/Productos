import { Component } from '@angular/core';
import { Producto } from "../models/producto";
import { ProductoService } from "../services/producto.service";
import { AlertController } from '@ionic/angular';

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

  constructor(private productoService: ProductoService, private router: Router,
    private alertController: AlertController) {
    this.productos =  this.productoService.getProductos();
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
            
            this.productoService.removeProducto(pos);
            this.productos = this.productoService.getProductos();
          }
        }
      ]
    });

    await alert.present();

  }

  public getProductoById(id_producto: string){
    this.router.navigate(['/view-product'], { 
      queryParams: {id: id_producto}
    });
  }

  public navigateCarrito(){
    this.router.navigate(['/view-carrito']);
  }

  public addProducto(){
    this.productoService.addProducto(this.producto);
    this.productos = this.productoService.getProductos();
  }

  public async addProductoCarrito(producto: Producto){
    
    const alert = await this.alertController.create({
      header: 'ALERTA',
      subHeader: 'Se agrego correctamente el producto al carrito',
      message: 'Podrás ver todos los productos agregados en carrito',
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            
            console.log(producto);
            this.productoService.addProductoCarrito(producto);
            
          }
        }
      ]
    });

    await alert.present();
  }

  async alertAddProduct() {
    const alert = await this.alertController.create({
      header: 'Ingrese la información de su producto',
      inputs: [
        {
          name: 'description',
          type: 'text',
          placeholder: 'Descripción',
        },
        {
          name: 'foto',
          type: 'text',
          placeholder: 'URL de la imagen'
        },
        {
          name: 'precio',
          type: 'number',
          placeholder: 'Precio'
        },
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      },
      {
        text: 'Aceptar',
        handler: (alertData) => {
          let i = this.productos.length+1;
          this.producto = {
            foto: alertData.foto,
            nombre: alertData.description,
            description: alertData.description,
            precio: parseFloat(alertData.precio),
            id: i.toString(),
          }
          this.productoService.addProducto(this.producto)
        }
      }],
    });

    await alert.present();
  }
}
