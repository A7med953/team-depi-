import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


export type Role = 'doctor' | 'pharmacy' | 'patient';


export interface UserCredential {
email: string;
password: string;
role: Role;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
private readonly STORAGE_KEY = 'my_medical_app_user';


// only these 3 emails are allowed
private readonly USERS: UserCredential[] = [
{ email: 'doctor@example.com', password: 'doc123', role: 'doctor' },
{ email: 'pharmacy@example.com', password: 'pharm123', role: 'pharmacy' },
{ email: 'patient@example.com', password: 'patient123', role: 'patient' },
];


constructor(private router: Router) {}


login(email: string, password: string) {
const user = this.USERS.find(u => u.email === email && u.password === password);
if (!user) return null;


const payload = { email: user.email, role: user.role };
localStorage.setItem(this.STORAGE_KEY, JSON.stringify(payload));
return payload;
}


logout() {
localStorage.removeItem(this.STORAGE_KEY);
this.router.navigate(['/login']);
}


get currentUser(): { email: string; role: Role } | null {
const raw = localStorage.getItem(this.STORAGE_KEY);
return raw ? JSON.parse(raw) : null;
}


isAuthenticated(): boolean {
return !!this.currentUser;
}


hasRole(role: Role) {
const u = this.currentUser;
return !!u && u.role === role;
}
}