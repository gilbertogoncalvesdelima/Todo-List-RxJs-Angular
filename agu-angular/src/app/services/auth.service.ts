import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://6696d0a00312447373c3ca18.mockapi.io';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<{ success: boolean, message: string }> {
    return this.http.get<any[]>(`${this.apiUrl}/login?username=${username}`)
      .pipe(
        switchMap(users => {
          if (users.length > 0) {
            if (users[0].password === password) {
              localStorage.setItem('token', 'mock-token');
              return of({ success: true, message: 'Login com sucesso' });
            } else {
              return of({ success: false, message: 'Senha Incorreta' });
            }
          } else {
            return of({ success: false, message: 'Usuário não encontrado' });
          }
        }),
        catchError(error => {
          console.error('Login error', error);
          return of({ success: false, message: 'Credencias inválidas' });
        })
      );
  }

  register(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            return true;
          } else {
            return false;
          }
        }),
        catchError(error => {
          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
