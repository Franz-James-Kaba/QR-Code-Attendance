import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-signin',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldComponent,
    ButtonComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  protected isLoading = false;
  protected showErrors = false;

  private readonly fb = inject(FormBuilder);

  protected readonly signInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected get emailControl() {
    return this.signInForm.get('email')!;
  }

  protected get passwordControl() {
    return this.signInForm.get('password')!;
  }

  protected getEmailErrorMessage(): string {
    if (this.emailControl.hasError('required')) {
      return 'Email is required';
    }
    if (this.emailControl.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  protected getPasswordErrorMessage(): string {
    if (this.passwordControl.hasError('required')) {
      return 'Password is required';
    }
    if (this.passwordControl.hasError('minlength')) {
      return 'Password must be at least 8 characters';
    }
    return '';
  }

  protected handleSubmit() {
    this.showErrors = true;

    if (this.signInForm.invalid) {
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      console.log(this.signInForm.value);
      this.isLoading = false;
    }, 3000);
  }
}
