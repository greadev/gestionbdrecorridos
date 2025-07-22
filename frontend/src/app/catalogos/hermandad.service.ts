import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Hermandad {
  CODIGO_HERMANDAD: number;
  NOMBRE: string;
}

@Injectable({ providedIn: 'root' })
export class HermandadService {
  private apiUrl = `${environment.apiUrl}/hermandades`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Hermandad[]> {
    return this.http.get<Hermandad[]>(this.apiUrl);
  }
}
