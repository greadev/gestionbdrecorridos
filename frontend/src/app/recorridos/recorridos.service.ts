import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Recorrido {
  CODIGO_RECORRIDO: number;
  CODIGO_HERMANDAD: number;
  CODIGO_TRACCION: number;
  CODIGO_FECHA: number;
  CODIGO_HORA: number;
  CODIGO_JORNADA: number;
  CODIGO_TOPONIMO: number;
  CODIGO_CATEGORIA: number;
  CODIGO_PARCELA: number;
  OBSERVACIONES: string;
}

export interface RecorridoAppGestion {
  CODIGO_RECORRIDO: number;
  NOMBRE: string;
  DESCRIPCION_trac: string;
  DIA_SEMANA: string;
  HORA: string;
  categoria_descripcion: string;
  nombre_top: string;
  nombre_par: string;
}


@Injectable({
  providedIn: 'root'
})
export class RecorridosService {
  private apiUrl = `${environment.apiUrl}/recorridos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Recorrido[]> {
    return this.http.get<Recorrido[]>(this.apiUrl);
  }
  
  getAllAppGestion(): Observable<RecorridoAppGestion[]> {
    return this.http.get<RecorridoAppGestion[]>(`${environment.apiUrl}/recorridos`);
  }
  
  getById(id: number): Observable<Recorrido> {
    return this.http.get<Recorrido>(`${this.apiUrl}/${id}`);
  }

  create(recorrido: Omit<Recorrido, 'CODIGO_RECORRIDO'>): Observable<Recorrido> {
    return this.http.post<Recorrido>(this.apiUrl, recorrido);
  }

  update(id: number, recorrido: Omit<Recorrido, 'CODIGO_RECORRIDO'>): Observable<Recorrido> {
    return this.http.put<Recorrido>(`${this.apiUrl}/${id}`, recorrido);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
