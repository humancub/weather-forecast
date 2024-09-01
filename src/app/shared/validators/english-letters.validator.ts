import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function englishLettersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const englishLettersRegex = /^[a-zA-Z\s]*$/;

    if (!value) {
      return null;
    }

    return englishLettersRegex.test(value) ? null : { nonEnglishLetters: true };
  };
}
