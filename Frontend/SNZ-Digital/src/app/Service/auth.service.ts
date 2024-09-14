import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8084/api/users";
  
  constructor(private http: HttpClient) { }
  

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
    console.log("Token recibido:", token);
    if (token) {
      const decodedToken: any = jwtDecode(token);  // Use the named import jwtDecode
      return decodedToken.authorities || null; // Adjust "authorities" according to your token's claim structure
    }
    return null;
  }
}
