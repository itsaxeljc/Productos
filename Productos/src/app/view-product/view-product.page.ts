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
      foto: "https://http2.mlstatic.com/D_NQ_NP_2X_771415-MLA44492818319_012021-V.webp",
      nombre: "XBOX ONE SERIES SE",
      description: "Adaptada a tus necesidades Guarda tus apps, fotos, videos y mucho más en el disco duro, que cuenta con una capacidad de 512 GB. Al contar con un procesador de 8 núcleos y uno gráfico, brinda una experiencia dinámica, respuestas ágiles, y transiciones fluidas de imágenes en alta definición. Por otro lado, tiene puerto USB y salida HDMI, que permiten conectar accesorios y cargar la batería de tu control mientras juegas.",
      precio: 5999,
      id: "1"
    }
   }

  ngOnInit() {
    this.aroute.queryParams.subscribe(
      (params) => {
        this.productoService.productDetail(params.id).subscribe(item => {
          this.producto = item as Producto;
        })
      }
    );
  }

}
