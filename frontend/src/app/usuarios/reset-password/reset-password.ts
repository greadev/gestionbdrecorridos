import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgIf, NgForOf } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss'],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    MatOptionModule,
    NgForOf,
    NgIf
  ]
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error: string | null = null;
  success = false;
  usuarios: { ID: number, USERNAME: string, ROL: string }[] = [];

  ngOnInit() {
    this.http.get<{ ID: number, USERNAME: string, ROL: string }[]>(`${environment.apiUrl}/auth/users`)
      .subscribe(users => this.usuarios = users);
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(form: FormGroup) {
    const pass = form.get('newPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    this.success = false;
    const { username, newPassword } = this.form.value;
    this.http.post(`${environment.apiUrl}/auth/reset-password`, { username, newPassword }).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        this.form.reset();
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.error || 'Error cambiando contraseña';
      }
    });
  }
}
