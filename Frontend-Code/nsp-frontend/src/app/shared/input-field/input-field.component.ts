import { Component, forwardRef, Input } from '@angular/core';
import { InputProps } from '../../core/models/shared/input-field.types';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() props!: InputProps;
  @Input() id = `text-field-${Math.random().toString(36).slice(2, 11)}`;

  public value = '';
  public isDisabled = false;

  public onChange: (value: string) => void = () => {};
  public onTouched: () => void = () => {};

  public writeValue(obj: string): void {
    this.value = obj || '';
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
  }

  public get ariaInvalid(): boolean {
    return this.props.isInvalid!;
  }

  public get ariaDescribedBy(): string {
    return this.props.isInvalid ? `${this.id}-error` : '';
  }
}
