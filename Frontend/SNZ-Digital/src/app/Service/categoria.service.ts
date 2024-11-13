import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from 'src/models/categoria';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    private baseUrl = 'http://localhost:8084/api/categorias'; // Ajusta la URL según tu API

    constructor(private http: HttpClient) {}

    getCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${this.baseUrl}/getall`);
    }

    createCategoria(catName: string, catDetalle: string, imagen: File | null): Observable<any> {
        // Crear un FormData para enviar los datos del formulario, incluyendo la imagen
        const formData = new FormData();
        formData.append('catName', catName);
        formData.append('catDetalle', catDetalle);
        
        if (imagen) {
            formData.append('imagen', imagen, imagen.name);  // Adjuntar la imagen, si existe
        }

        return this.http.post(`${this.baseUrl}/create`, formData);
    }

  // Obtener una categoría por ID
  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.baseUrl}/get/${id}`);
  }

  // Actualizar una categoría existente
  updateCategoria(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.baseUrl}/update/${id}`, categoria);
  }

  // Eliminar una categoría por ID
  deleteCategoria(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`);
  }

  
}
