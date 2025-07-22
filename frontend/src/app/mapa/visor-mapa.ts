import { Component, Input, OnChanges, SimpleChanges, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import maplibregl, { Map, GeoJSONSource, LngLatLike, LayerSpecification } from 'maplibre-gl';

@Component({
  selector: 'app-visor-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visor-mapa.html',
  styleUrls: ['./visor-mapa.scss']
})
export class VisorMapaComponent implements OnChanges, OnDestroy {
  @Input() geojson: GeoJSON.FeatureCollection | null = null;         // GeoJSON principal
  @Input() center: LngLatLike = [-6, 37.3];                         // Centro por defecto (Andalucía occidental)
  @Input() zoom = 10;
  @Input() height = '500px';
  @Input() externalLayers: { id: string, source: any, layer: LayerSpecification }[] = []; // Capas externas (opcional)

  @ViewChild('mapaContainer', { static: true }) mapaContainer!: ElementRef<HTMLDivElement>;
  private map?: Map;
  private mapReady = false;

  ngOnChanges(changes: SimpleChanges) {
    if (!this.map) {
      this.inicializarMapa();
    } else if (changes['geojson'] && this.geojson ) {
      this.cargarGeoJson();
    }
    if (changes['center'] && this.map) {
      this.map.setCenter(this.center);
    }
    if (changes['zoom'] && this.map) {
      this.map.setZoom(this.zoom);
    }
  }

  inicializarMapa() {
    this.map = new maplibregl.Map({
      container: this.mapaContainer.nativeElement,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', // Estilo minimalista libre
      //style: '../../src/assets/style-satellite.json',
      center: this.center,
      zoom: this.zoom
    });


    this.map.on('load', () => {
      //this.cargarGeoJson();
      this.map?.addControl(new maplibregl.NavigationControl(),'top-right');
      this.mapReady = true;
      if (this.geojson) this.cargarGeoJson();

      // Cargar capas externas si las hay
      for (const layerDef of this.externalLayers) {
        if (!this.map?.getSource(layerDef.id)) {
          this.map?.addSource(layerDef.id, layerDef.source);
          this.map?.addLayer(layerDef.layer);
        }
      }

    });

    // Popup en click de feature
    this.map.on('click', 'recorridos-layer', (e: any) => {
      const feature = e.features?.[0];
      if (feature) {
        const props = Object.entries(feature.properties)
          .map(([k, v]) => `<strong>${k}:</strong> ${v}`)
          .join('<br>');
        new maplibregl.Popup(
          {
            //anchor: 'auto',       // Elige automáticamente el mejor lado
            maxWidth: '250px',    // Limita el ancho
            offset: 1
          }
        )
          .setLngLat(e.lngLat)
          .setHTML(props)
          .addTo(this.map!);
      }
    });

    // Cambia cursor sobre features
    this.map.on('mouseenter', 'recorridos-layer', () => {
      this.map?.getCanvas().style.setProperty('cursor', 'pointer');
    });
    this.map.on('mouseleave', 'recorridos-layer', () => {
      this.map?.getCanvas().style.setProperty('cursor', '');
    });
  }

  cargarGeoJson() {
    console.log('GeoJSON recibido en visor:', this.geojson);

    if (!this.map || !this.geojson || !this.mapReady || !this.map.isStyleLoaded()) return;
    if (this.geojson?.features?.length){}

    if (!this.map || !this.geojson) return;

    // Elimina fuente y capa si ya existen
    if (this.map.getLayer('recorridos-layer')) this.map.removeLayer('recorridos-layer');
    if (this.map.getLayer('recorridos-puntos')) this.map.removeLayer('recorridos-puntos');
    if (this.map.getSource('recorridos')) this.map.removeSource('recorridos');

    this.map.addSource('recorridos', {
      type: 'geojson',
      data: this.geojson
    });

    // Diferencia color según tipo de geometría
    this.map.addLayer({
      id: 'recorridos-layer',
      type: 'line',
      source: 'recorridos',
      paint: {
        'line-color': '#b7d801',
        'line-width': 15,
        'line-opacity': 0.9
      },
      layout: {
        'line-cap': "round",
        'line-join': 'round'
      },
      filter: ['==', '$type', 'LineString']
    });

    // (Opcional: pinta puntos si existen)
    this.map.addLayer({
      id: 'recorridos-puntos',
      type: 'circle',
      source: 'recorridos',
      paint: {
        'circle-radius': 6,
        'circle-color': '#FF4136',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff'
      },
      filter: ['==', '$type', 'Point']
    });

    // Ajusta el mapa para encajar la capa
    const bbox = this.calcularBbox(this.geojson);
    if (bbox) {
      this.map.fitBounds(bbox, { padding: 60, duration: 0 });
    }
  }

  calcularBbox(geojson: GeoJSON.FeatureCollection): [number, number, number, number] | null {
    try {
      const coords: number[][] = [];
      geojson.features.forEach(f => {
        if (!f.geometry) return;
        if (f.geometry.type === 'Point') {
          coords.push(f.geometry.coordinates as number[]);
        } else if (f.geometry.type === 'LineString') {
          coords.push(...(f.geometry.coordinates as number[][]));
        } else if (f.geometry.type === 'Polygon') {
          coords.push(...(f.geometry.coordinates[0] as number[][]));
        }
      });
      if (!coords.length) return null;
      const lons = coords.map(c => c[0]);
      const lats = coords.map(c => c[1]);
      return [
        Math.min(...lons), Math.min(...lats),
        Math.max(...lons), Math.max(...lats)
      ];
    } catch {
      return null;
    }
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
