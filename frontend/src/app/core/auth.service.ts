import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'access_token';
  private userKey = 'user';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string, user: any }> {
    return this.http.post<{ token: string, user: any }>(`${environment.apiUrl}/auth/login`, { username, password }).pipe(
      tap(res => {
        if (res && res.token) {
          localStorage.setItem(this.tokenKey, res.token);
        }
        if (res && res.user) {
          localStorage.setItem(this.userKey, JSON.stringify(res.user));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.rol : null;
  }

  getUsername(): string | null {
    const user = this.getUser();
    return user ? user.username : null;
  }
}
