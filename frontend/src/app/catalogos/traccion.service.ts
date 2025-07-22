import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Traccion {
  CODIGO_TRACCION: number;
  DESCRIPCION_trac: string;
}

@Injectable({ providedIn: 'root' })
export class TraccionService {
  private apiUrl = `${environment.apiUrl}/tracciones`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Traccion[]> {
    return this.http.get<Traccion[]>(this.apiUrl);
  }
}
