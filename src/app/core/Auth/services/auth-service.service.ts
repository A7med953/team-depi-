import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { threadId } from 'worker_threads';
import { environments } from '../../../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
export interface User {
  name: string;
  email: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private token: string = '';
   private userData = new BehaviorSubject<any>(null);
  user$ = this.userData.asObservable();
  http: any;
  constructor(private httpClient: HttpClient, private router: Router,@Inject(PLATFORM_ID) private platformId:object) {
      if (isPlatformBrowser(this.platformId)) {
       this.token = localStorage.getItem('authToken') || '';
      }
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    this.userData.next(JSON.parse(savedUser));
  }
  }

  register(data: any): Observable<any> {
    return this.httpClient.post(environments.baseUrl + 'auth/signup', data);
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(environments.baseUrl + 'auth/signin', data);
  }

  saveToken(token: string): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  isAuthenticated(): boolean {
    if (typeof localStorage != 'undefined') {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  decodeToken() {
    try {
      if (typeof localStorage != 'undefined') {
        const decoded = jwtDecode(localStorage.getItem('authToken')!);
        console.log(decoded);
      }
    } catch {
      this.logout();
    }
  }

    setUser(data: any) {
    this.userData.next(data);
    localStorage.setItem('userData', JSON.stringify(data));
  }


  loadUser() {
    const stored = localStorage.getItem('userData');
    if (stored) {
      this.userData.next(JSON.parse(stored));
    }
  }
getUserProfile(): Observable<any> {
  return this.httpClient.get(`${environments.baseUrl}users/me`, {
    headers: this.getHeaders()
  });
}
   private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

}