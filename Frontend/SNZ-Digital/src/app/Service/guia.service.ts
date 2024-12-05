import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guia } from 'src/models/guia';

@Injectable({
  providedIn: 'root',
})
export class GuideService {
  private baseUrl = 'http://localhost:8084/api/guias'; // Asegúrate de ajustar la URL

  constructor(private http: HttpClient) { }

  getAllGuides(): Observable<Guia[]> {
    return this.http.get<Guia[]>(`${this.baseUrl}/getall`);
  }

  getGuideById(guideId: number): Observable<Guia> {
    return this.http.get<Guia>(`${this.baseUrl}/get/${guideId}`);
  }

  createGuide(guia: Guia): Observable<Guia> {
    return this.http.post<Guia>(`${this.baseUrl}/create`, guia);
  }
  

  updateGuia(guideId: number, guia: Guia): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${guideId}`, guia);
  }

  deleteGuia(guideId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${guideId}`);
  }

}
