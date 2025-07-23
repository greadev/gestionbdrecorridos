import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgForOf, NgIf } from '@angular/common';
import { environment } from '../../../environments/environment';

// Validador custom para contraseña confirmada
export const passwordMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const pass = form.get('password')?.value;
  const confirm = form.get('confirmPassword')?.value;
  return pass === confirm ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-usuario-register',
  standalone: true,
  templateUrl: './usuario-register.html',
  styleUrls: ['./usuario-register.scss'],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    NgForOf,
    NgIf
  ]
})
export class UsuarioRegisterComponent {
  form: FormGroup;
  loading = false;
  error: string | null = null;
  roles = ['usuario', 'gestor', 'admin', 'superadmin'];
  success = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      rol: ['usuario', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    this.success = false;
    const { username, password, rol } = this.form.value;
    this.http.post(`${environment.apiUrl}/auth/register`, { username, password, rol }).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        this.form.reset({ rol: 'usuario' });
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.error || 'Error creando usuario';
      }
    });
  }
}
