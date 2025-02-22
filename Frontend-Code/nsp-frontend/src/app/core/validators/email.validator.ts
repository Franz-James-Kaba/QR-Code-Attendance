import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function amalitechEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailPattern = /^[a-z0-9._%+-]+@amalitech\.(com|org)$/;
    return emailPattern.test(control.value)
      ? null
      : { invalidEmail: 'Email must be in the format yourname@amalitech.com or yourname@amalitech.org' };
  };
}
