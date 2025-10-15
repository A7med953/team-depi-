import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';

import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { response } from 'express';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ValidationMessagesComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  resMsg: string = '';
  isLoading = true;
  authForm!: FormGroup;
  isShowPassword: boolean = true;
  private readonly authService = inject(AuthServiceService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  formInit() {
    this.authForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$/
          ),
        ],
      ],
    });
  }

  submitForm() {
    this.isLoading = false;
    if (this.authForm.valid || !this.isLoading) {
      console.log(this.authForm.value);
    }

    this.authService.login(this.authForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = true;
        if (response.message == 'success') {
          this.authService.saveToken(response.token);
          this.router.navigate(['/home']);
        }
           this.authService.getUserProfile().subscribe(profile => {
  this.authService.setUser({
    name: profile.name,
    email: profile.email
  });
});

          localStorage.setItem('user', JSON.stringify(response.user));
      },
      error: ({ error }) => {
        console.log(error);
        this.resMsg = error.message;
        this.isLoading = true;
      },
    });
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  ngOnInit(): void {
    this.formInit();
  }

}