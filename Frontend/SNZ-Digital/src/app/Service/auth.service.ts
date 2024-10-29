import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthCreateUserRequest } from 'src/models/usuarioI';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8084/api/users";
  
  constructor(private http: HttpClient) { }
  
  register(user: AuthCreateUserRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, user);
  }
  searchByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/find/${email}`);
  }
  deactivateUser(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/deactivate/${id}`, { activated: false });
  }
  updateUserById(id:number, nuevoU:AuthCreateUserRequest):Observable<AuthCreateUserRequest>{
    return this.http.put<AuthCreateUserRequest>(`${this.baseUrl}/update/${id}`, nuevoU);
  }
  getAllUser(): Observable<AuthCreateUserRequest[]> {
    return this.http.get<AuthCreateUserRequest[]>(`${this.baseUrl}/getAll`);
  }
  getUserById(id: number): Observable<AuthCreateUserRequest> {
    return this.http.get<AuthCreateUserRequest>(`${this.baseUrl}/findById/${id}`);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/log-in`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getRoleFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);  // Use the named import jwtDecode
      return decodedToken.authorities || null; // Adjust "authorities" according to your token's claim structure
    }
    return null;
  }

  getTokenExpirationDate(): Date | null {  
    // Suponiendo que decides no usar expiración en absoluto  
    return null; // No habrá expiración  
}  

isTokenExpired(): boolean {  
    // Suponiendo que decides que el token nunca expira  
    return false; // El token nunca expira  
}
  

  getEmailFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.sub || null; // Extraer el 'sub' que contiene el email
    }
    return null;
  }
  getAllPPaginados(page: number, size: number): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.baseUrl}/userAllPaginado`, { params })
      .pipe(
        map(response => {
          return {
            usuarios: response.usuarios,
            currentPage: response.currentPage,
            totalItems: response.totalItems,
            totalPages: response.totalPages
          };
        })
      );
  }

}


