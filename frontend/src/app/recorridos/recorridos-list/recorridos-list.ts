import { Component, OnInit } from '@angular/core';
import { RecorridosService, Recorrido, RecorridoAppGestion  } from '../recorridos.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-recorridos-list',
  standalone: true,
  templateUrl: './recorridos-list.html',
  styleUrls: ['./recorridos-list.scss'],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule, // <-- añade esto
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,	// <-- añade esto para mat-error
    NgIf,
    RouterModule	
  ]
})
export class RecorridosListComponent implements OnInit {
  recorridos: RecorridoAppGestion[] = [];
  recorridosFiltrados: RecorridoAppGestion[] = [];
  filtroNombre: string = '';
  displayedColumns: string[] = [
	'CODIGO_RECORRIDO',
	'NOMBRE',
	'DESCRIPCION_trac',
	'DIA_SEMANA',
	'HORA',
	'categoria_descripcion',
	'nombre_top',
	'nombre_par',
	'acciones'
  ];
  loading = false;
  error: string | null = null;

  constructor(private recorridosService: RecorridosService) {}

  ngOnInit() {
    this.cargarRecorridos();
  }

  cargarRecorridos() {
    this.loading = true;
    this.recorridosService.getAllAppGestion().subscribe({
      next: data => {
        this.recorridos = data;
		this.filtrarRecorridos();
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.error || 'Error cargando recorridos';
        this.loading = false;
      }
    });
  }
  
  filtrarRecorridos() {
    const filtro = this.filtroNombre.trim().toLowerCase();
    this.recorridosFiltrados = !filtro
      ? this.recorridos
      : this.recorridos.filter(r =>
          (r.NOMBRE || '').toLowerCase().includes(filtro)
        );
  }
  
  limpiarFiltro() {
    this.filtroNombre = '';
    this.filtrarRecorridos();
  }

  borrar(id: number) {
    if (confirm('¿Seguro que quieres borrar este recorrido?')) {
      this.recorridosService.delete(id).subscribe({
        next: () => this.cargarRecorridos(),
        error: err => alert('Error borrando: ' + (err.error?.error || err.message))
      });
    }
  }
}
