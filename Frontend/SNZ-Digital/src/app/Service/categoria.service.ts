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
}
