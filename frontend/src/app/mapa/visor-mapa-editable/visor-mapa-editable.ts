import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// @ts-ignore
import maplibregl from 'maplibre-gl';
// @ts-ignore
import MaplibreDraw from 'maplibre-gl-draw';

@Component({
  selector: 'app-visor-mapa-editable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visor-mapa-editable.html',
  styleUrls: ['./visor-mapa-editable.scss']
})
export class VisorMapaEditableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() geojson: GeoJSON.FeatureCollection | null = null;
  @Input() tipo: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | '' = '';
  @Input() editable: boolean = false;
  @Output() geometryChange = new EventEmitter<GeoJSON.FeatureCollection>();
  @Output() drawStart = new EventEmitter<void>();
  @Output() drawEnd = new EventEmitter<void>();

  @ViewChild('mapaContainer', { static: true }) mapaContainer!: ElementRef<HTMLDivElement>;
  map: maplibregl.Map | null = null;
  draw: any = null;
  editing = false;
  initialGeojson: GeoJSON.FeatureCollection | null = null;

  ngOnInit() {
    this.inicializarMapa();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['geojson'] && this.geojson && this.map) {
      this.mostrarGeometria(this.geojson);
      this.initialGeojson = JSON.parse(JSON.stringify(this.geojson));
    }
    if (changes['editable']) {
      this.toggleEdit(this.editable);
    }
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  inicializarMapa() {
    this.map = new maplibregl.Map({
      container: this.mapaContainer.nativeElement,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-5.99, 37.38],
      zoom: 10,
    });

    this.map.on('load', () => {
      if (this.geojson) {
        this.mostrarGeometria(this.geojson);
      }
      this.initDraw();
    });
  }

  initDraw() {
    this.draw = new MaplibreDraw({
      displayControlsDefault: false,
      controls: {
        line_string: true,
        polygon: true,
        point: true,
        trash: true,
        combine_features: false,
        uncombine_features: false,
      },
      defaultMode: 'simple_select'
    });
    this.map!.addControl(this.draw);

    this.map!.on('draw.create', () => this.emitirGeometry());
    this.map!.on('draw.update', () => this.emitirGeometry());
    this.map!.on('draw.delete', () => this.emitirGeometry());
  }

  mostrarGeometria(geojson: GeoJSON.FeatureCollection) {
    if (this.draw) {
      this.draw.deleteAll();
      if (geojson.features.length) {
        geojson.features.forEach(feature => this.draw.add(feature));
        this.ajustarVista(geojson);
      }
    }
  }

  ajustarVista(geojson: GeoJSON.FeatureCollection) {
    const bbox = this.calcularBBox(geojson);
    if (bbox) this.map!.fitBounds(bbox, { padding: 60, duration: 0 });
  }

  calcularBBox(geojson: GeoJSON.FeatureCollection): [number, number, number, number] | null {
    let coords: number[][] = [];
    geojson.features.forEach(f => {
      if (f.geometry.type === 'Point') {
        coords.push(f.geometry.coordinates as number[]);
      } else if (f.geometry.type === 'LineString' || f.geometry.type === 'MultiPoint') {
        coords.push(...(f.geometry.coordinates as number[][]));
      } else if (f.geometry.type === 'Polygon' || f.geometry.type === 'MultiLineString') {
        (f.geometry.coordinates as any[][]).forEach(c => coords.push(...c));
      } else if (f.geometry.type === 'MultiPolygon') {
        (f.geometry.coordinates as any[][][]).forEach(poly => poly.forEach(c => coords.push(...c)));
      }
    });
    if (!coords.length) return null;
    const lons = coords.map(c => c[0]);
    const lats = coords.map(c => c[1]);
    return [
      Math.min(...lons),
      Math.min(...lats),
      Math.max(...lons),
      Math.max(...lats),
    ];
  }

  toggleEdit(activar: boolean) {
    this.editing = activar;
    if (!this.draw) return;
    if (activar) {
      // Permite edición
      this.draw.changeMode('draw_' + (this.tipo ? this.tipo.toLowerCase() : 'line_string'));
      this.draw.changeMode('simple_select');
    } else {
      // Solo visualizar
      this.draw.changeMode('simple_select');
    }
  }

  onEditar() {
    this.toggleEdit(true);
    this.drawStart.emit();
  }

  onCancelar() {
    if (this.initialGeojson) {
      this.mostrarGeometria(this.initialGeojson);
    }
    this.toggleEdit(false);
  }

  onGuardar() {
    const data = this.draw.getAll();
    this.geometryChange.emit(data);
    this.drawEnd.emit();
    this.toggleEdit(false);
  }

  emitirGeometry() {
    const data = this.draw.getAll();
    this.geometryChange.emit(data);
  }
}
