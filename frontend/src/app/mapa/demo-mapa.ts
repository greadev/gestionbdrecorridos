import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VisorMapaComponent } from './visor-mapa';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-demo-mapa',
  standalone: true,
  templateUrl: './demo-mapa.html',
  imports: [CommonModule, HttpClientModule, VisorMapaComponent]
})
export class DemoMapaComponent implements OnInit {
  geojsonRecorridos: GeoJSON.FeatureCollection | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Cambia la URL por la tuya real y añade token si lo necesitas (si hay interceptor, ya lo añade solo)
    this.geojsonRecorridos = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [-6.00, 37.30],
              [-6.05, 37.32]
            ]
          },
          properties: { CODIGO_RECORRIDO: 1 }
        }
      ]
    };
    this.http.get<GeoJSON.FeatureCollection>(`${environment.apiUrl}/itinerarios/geojson`)
      .subscribe(data => this.geojsonRecorridos = data);
  }
}
