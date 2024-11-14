import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RegisterRequestDTO } from 'src/app/models/register-request.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private url = 'http://localhost:8080/api/auth';

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { username, password })
    .pipe(
      tap((response: any) =>{
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', JSON.stringify(response.roles));
        localStorage.setItem('userId', response.userId.toString());
        this.authStatus.next(true);
      })
    )
  }

  registerUser(registerData: RegisterRequestDTO): Observable<any> {
    return this.http.post(`${this.url}/register`, registerData, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.authStatus.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
