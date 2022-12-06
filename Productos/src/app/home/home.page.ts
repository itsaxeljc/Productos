import { Component } from '@angular/core';
import { Producto } from "../models/producto";
import { ProductoService } from "../services/producto.service";
import { AlertController } from '@ionic/angular';

//Routes
import { Router } from '@angular/router'; 
import { Total } from '../models/total';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public productos: Producto[];
  public producto: Producto;
  public total: Total;

  constructor(private productoService: ProductoService, private router: Router,
    private alertController: AlertController) {
    this.productoService.getProductos().subscribe( res => {
      this.productos = res;
    })
    this.productoService.getTotal().subscribe( res => {
      this.total = res[0];
    });
  }

  public async removeProducto(id: string){
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
            this.productoService.removeProducto(id);
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
            let prod = {
              nombre: producto.nombre,
              foto: producto.foto,
              precio: producto.precio
            }
            this.productoService.addProductoCarrito(prod);
            this.productoService.updateTotal(producto.precio, this.total);
          }
        }
      ]
    });

    await alert.present();
  }

  public async error(){
    const alert = await this.alertController.create({
      header: 'ALERTA',
      subHeader: 'Revise que los campos estén completos',
      message: 'Uno o más campos no son correctos, revise por favor',
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.alertAddProduct();
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
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
        },
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
          if(alertData.foto == "" || alertData.description == "" || alertData.precio == ""){
            this.error();
          } else {
            this.producto = {
              foto: alertData.foto,
              nombre: alertData.name,
              description: alertData.description,
              precio: parseFloat(alertData.precio),
            }
            this.productoService.addProducto(this.producto)
          }
        }
      }],
    });

    await alert.present();
  }
}
