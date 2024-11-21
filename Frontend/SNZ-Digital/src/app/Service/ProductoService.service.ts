import { Producto } from 'src/models/producto';   // Ajusta la ruta si es necesario
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  getProductById(productId: number) {
    return this.http.get<Producto>(`${this.baseUrl}/get/${productId}`);
  }
  private baseUrl = 'http://localhost:8084/api/productos'; // Asegúrate de definir baseUrl aquí

  constructor(private http: HttpClient) { }

  getAllProductos(): Observable<Producto[]> {
    return this.http.get<{ message: string; statusCode: number; data: Producto[] }>(`${this.baseUrl}/getall`).pipe(
      map(response => response.data),  // Mapea para devolver solo la propiedad 'data'
      catchError((error) => {
        console.error('Error al obtener productos', error);
        return throwError(error);
      })
    );
  }

  getProductosByCategoria(categoriaId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/categoria/${categoriaId}`);
  }

    // Método para obtener productos por categoría
    getProductosByCategoriaPaginado(categoriaCatId: number, page: number = 0, size: number = 5): Observable<Producto> {
      // Configurar los parámetros de la solicitud
      const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
  
      // Corregir la URL para incluir la categoría
      return this.http.get<Producto>(`${this.baseUrl}/categoria/${categoriaCatId}`, { params });
    }

  // Método para obtener un producto por ID, con la estructura de respuesta especificada
  getProductoById(id: number): Observable<{ message: string; statusCode: number; data: Producto }> {
    return this.http.get<{ message: string; statusCode: number; data: Producto }>(`${this.baseUrl}/get/${id}`);
  }

  updateProducto(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, formData);
  }

  createProducto(producto: Producto, imagenFile: File | null): Observable<any> {
    const formData = new FormData();
    
    formData.append('productName', producto.productName || '');
    formData.append('descripcion', producto.descripcion || '');
    formData.append('status', producto.status?.toString() || '');
    formData.append('precio', producto.precio?.toString() || '0');
    formData.append('marca', producto.marca || ''); // Agrega la marca

    
    if (producto.categoriaCatId) {
      formData.append('categoriaCatId', producto.categoriaCatId.toString());
    } else {
      console.warn('El campo categoriaCatId está vacío');
    }
  
    if (imagenFile) {
      formData.append('imagen', imagenFile);
    }
  
    return this.http.post<any>(`${this.baseUrl}/create`, formData).pipe();
  }
  
  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar el producto:', error);
        return throwError(() => new Error('No se pudo eliminar el producto. Intente nuevamente.'));
      })
    );
  }

  getProductosActivos(): Observable<Producto[]> {
    return this.http.get<Producto[]>('http://localhost:8084/api/productos/getall');
  }
  

}