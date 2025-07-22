import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecorridosService, Recorrido } from '../recorridos.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf,NgForOf  } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { VisorMapaComponent } from '../../mapa/visor-mapa';
import { HermandadService, Hermandad} from '../../catalogos/hermandad.service';
import { TraccionService, Traccion} from '../../catalogos/traccion.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-recorrido-form',
  standalone: true,
  templateUrl: './recorrido-form.html',
  styleUrls: ['./recorrido-form.scss'],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    VisorMapaComponent,
    NgForOf,
    NgIf
  ]
})
export class RecorridoFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error: string | null = null;
  isEdit = false;
  id?: number;
  geojsonRecorrido: GeoJSON.FeatureCollection | null = null;
  geometryEdited: GeoJSON.FeatureCollection | null = null;

  hermandades: Hermandad[] = [];
  tracciones: Traccion[] = [];

  constructor(
    private fb: FormBuilder,
    private service: RecorridosService,
    private route: ActivatedRoute,
    public router: Router,
    private http: HttpClient,
    private hermandadService: HermandadService,
    private traccionService: TraccionService
  ) {
    this.form = this.fb.group({
      CODIGO_HERMANDAD: ['', Validators.required],
      CODIGO_TRACCION: ['', Validators.required],
      CODIGO_FECHA: ['', Validators.required],
      CODIGO_HORA: ['', Validators.required],
      CODIGO_JORNADA: ['', Validators.required],
      CODIGO_TOPONIMO: ['', Validators.required],
      CODIGO_CATEGORIA: ['', Validators.required],
      CODIGO_PARCELA: ['', Validators.required],
      OBSERVACIONES: ['']
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.loading = true;
      this.service.getById(this.id).subscribe({
        next: data => {
          this.form.patchValue(data);
          this.loading = false;
        },
        error: err => {
          this.error = err.error?.error || 'Error cargando recorrido';
          this.loading = false;
        }
      });

      this.hermandadService.getAll().subscribe({
        next: data => this.hermandades = data,
        error: () => this.hermandades = []
      });
      
      this.traccionService.getAll().subscribe({
        next: data => this.tracciones = data,
        error: () => this.tracciones = []
      });

      // Carga el geojson del recorrido (para el visor)
      this.http.get<GeoJSON.FeatureCollection>(
        `${environment.apiUrl}/itinerarios/${this.id}/geojson`
      ).subscribe({
        next: data => this.geojsonRecorrido = data,
        error: () => this.geojsonRecorrido = null
      });
    }
    console.log('Hermandades:', this.hermandades)
  }

  // Este método se llama al guardar la geometría editada
  onGeometryEdited(geojson: GeoJSON.FeatureCollection) {
    this.geometryEdited = geojson;
    // Puedes hacer una petición aquí, o guardar en el submit
    // Ejemplo: this.guardarGeometriaEnBackend(geojson);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const recorrido = this.form.value;
    if (this.isEdit && this.id) {
      this.service.update(this.id, recorrido).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/recorridos']);
        },
        error: err => {
          this.loading = false;
          this.error = err.error?.error || 'Error actualizando recorrido';
        }
      });
    } else {
      this.service.create(recorrido).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/recorridos']);
        },
        error: err => {
          this.loading = false;
          this.error = err.error?.error || 'Error creando recorrido';
        }
      });
    }
  }
}
