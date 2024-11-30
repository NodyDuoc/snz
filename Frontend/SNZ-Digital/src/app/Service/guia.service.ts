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
}
