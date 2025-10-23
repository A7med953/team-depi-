// import { Component, inject } from '@angular/core';
// import {
//   AbstractControl,
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
// import { AuthServiceService } from '../../services/auth-service.service';
// import { Router, RouterLink, RouterLinkActive } from '@angular/router';
// import { passwordMatchVlidator } from '../../../../shared/helpers/password-validation';
// @Component({
//   selector: 'app-register',
//   imports: [
//     ReactiveFormsModule,
//     ValidationMessagesComponent,
//     RouterLink,
//     RouterLinkActive,
//   ],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css',
// })
// export class RegisterComponent {
//   resMsg: string = '';
//   isLoading = true;
//   authForm!: FormGroup;
//   isShowPassword: boolean = true;
//   private readonly authService = inject(AuthServiceService);
//   private readonly router = inject(Router);
//   private readonly formBuilder = inject(FormBuilder);

//   formInit() {
//     this.authForm = this.formBuilder.group(
//       {
//         name: [
//           null,
//           [
//             Validators.required,
//             Validators.minLength(2),
//             Validators.maxLength(20),
//           ],
//         ],
//         email: [null, [Validators.required, Validators.email]],
//         password: [
//           null,
//           [
//             Validators.required,
//             Validators.pattern(
//               /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$/
//             ),
//           ],
//         ],
//         rePassword: [
//           null,
//           [
//             Validators.required,
//             Validators.pattern(
//               /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$/
//             ),
//           ],
//         ],
//       },
//       { validators: [passwordMatchVlidator] }
//     );
//   }

//   submitForm() {
//     this.isLoading = false;
//     if (this.authForm.valid) {
//       console.log(this.authForm.value);

//       this.authService.register(this.authForm.value).subscribe({
//         next: (response) => {
//           console.log(response);
//           this.isLoading = true;
//           if (response.message == 'success') {
//             this.router.navigate(['/login']);
//             this.authService.setUser({
//             name: response.user.name,
//             email: response.user.email,
//           });
//           }

//         },
//         error: ({ error }) => {
//           console.log(error);
//           this.resMsg = error.message;
//           this.isLoading = true;
//         },
//       });
//     }
//   }

//   showPassword() {
//     this.isShowPassword = !this.isShowPassword;
//   }

//   ngOnInit(): void {
//     this.formInit();
//   }
// }