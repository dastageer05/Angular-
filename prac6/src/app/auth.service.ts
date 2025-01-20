import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/users';
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  // Login API call
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.user) {
          this.setUser(response.user);
        }
      })
    );
  }

  register(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // CURRENT USER
  setUser(user: any): void {
    this.userSubject.next(user);
    console.log('User set:', user);
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }
}
