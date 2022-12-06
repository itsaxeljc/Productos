import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Total } from '../models/total';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private products: Producto[];
  private carrito: Producto[];
  private total: Total;

  constructor(private firestore: AngularFirestore) { 
      this.products =  [{
        foto: "https://http2.mlstatic.com/D_NQ_NP_2X_771415-MLA44492818319_012021-V.webp",
        nombre: "XBOX ONE SERIES S",
        description: "Adaptada a tus necesidades Guarda tus apps, fotos, videos y mucho más en el disco duro, que cuenta con una capacidad de 512 GB. Al contar con un procesador de 8 núcleos y uno gráfico, brinda una experiencia dinámica, respuestas ágiles, y transiciones fluidas de imágenes en alta definición. Por otro lado, tiene puerto USB y salida HDMI, que permiten conectar accesorios y cargar la batería de tu control mientras juegas.",
        precio: 5999,
        id: "1"
      },
      {
        foto: "https://i.linio.com/p/3eb425730a8af250d919ab62f0d09b49.jpg",
        nombre:"Monitor Acteck 933858",
        description: "Características: Diagonal de la pantalla: 54,6 cm (21.5 pul), Tipo HD: Full HD, Resolución: 1920 x 1080 Pixeles, Tiempo de respuesta: 8 ms, Velocidad de actualización: 75 Hz, Cantidad de puertos HDMI: 1, Color del producto: Negro",
        precio: 2199,
        id: "2"
      },{
        foto: "https://http2.mlstatic.com/D_NQ_NP_897472-MLM49771735901_042022-W.jpg",
        nombre:"Escritorio L Homeoffice",
        description: "Es un escritorio ideal para el hogar o la oficina, y a la vez, aprovecharlo en el estudio con los niños, o bien, para hacer homeoffice.",
        precio: 1299,
        id: "3"
      },{
        foto: "https://m.media-amazon.com/images/I/71fqZcSmJmL._AC_SS450_.jpg",
        nombre:"Silla de Trabajo del Ordenador",
        description: "Polea Silla de oficina Silencio: buena elasticidad, un apoyo cómodo para un deslizamiento suave, proteger el suelo se raye. Malla transpirable: cómodo y suave, fuerte resistencia al desgarro. Malla transpirable: cómodo y suave, fuerte resistencia al desgarro",
        precio: 999,
        id: "4"
      },];
      this.carrito = [];
  }

  public getProductos(){
    return this.firestore.collection('productos').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Producto;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  public addProducto(producto: Producto){
    this.firestore.collection('productos').add(producto);
  }

  public removeProducto(id: string){
    this.firestore.collection('productos').doc(id).delete();
  }

  public addProductoCarrito(producto: Producto){
    this.firestore.collection('carrito').add(producto);
  }

  public removeProductoCarrito(id: string){
    this.firestore.collection('carrito').doc(id).delete();
  }

  public getCarrito(){
    return this.firestore.collection('carrito').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Producto;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  public getTotal(){
    return this.firestore.collection('total').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Total;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public updateTotal(price: number, total:Total){
    total.total += price;
    this.firestore.doc('total/jYZoBxVk4qHH2fs7XHho').update(total);
  }

  public getProductoById (id: string){
    let result = this.firestore.collection('carrito').doc(id).valueChanges();
    return result;
  }

  public productDetail (id: string){
    let result = this.firestore.collection('productos').doc(id).valueChanges();
    return result;
  }
}