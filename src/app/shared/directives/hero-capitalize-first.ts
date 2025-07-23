import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCapitalizeFirst]'
})
export class CapitalizeFirstDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const upperFirst = input.value.charAt(0).toUpperCase() + input.value.slice(1);

    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(upperFirst, { emitEvent: false });
    }
  }
}
