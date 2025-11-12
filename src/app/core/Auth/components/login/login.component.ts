import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public form!: FormGroup;
  public error = '';
  public returnUrl = '/';

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', Validators.required] 
    });

    const q = this.route.snapshot.queryParamMap.get('returnUrl');
    if (q) this.returnUrl = q;
  }

  submit() {
    this.error = '';
    if (this.form.invalid) return;

    const { email, password, role } = this.form.value;
    const u = this.auth.login(email!, password!);

    if (!u) {
      this.error = 'البريد الإلكتروني أو كلمة المرور غير صحيحة (مصرح بثلاثة ايميلات فقط).';
      return;
    }

    if (u.role !== role) {
      this.error = 'نوع الحساب غير متوافق مع البيانات المدخلة.';
      return;
    }

    if (role === 'doctor') this.router.navigate(['/doctor']);
    else if (role === 'pharmacy') this.router.navigate(['/pharmacy']);
    else if (role === 'patient') this.router.navigate(['/patient']);
    else this.router.navigate([this.returnUrl]);
  }
}
