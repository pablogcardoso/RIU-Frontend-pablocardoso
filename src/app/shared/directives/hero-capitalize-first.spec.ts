import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, NgControl} from '@angular/forms';
import { CapitalizeFirstDirective } from './hero-capitalize-first';
import { By } from '@angular/platform-browser';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-test-host',
  imports: [ReactiveFormsModule, CapitalizeFirstDirective],
  template: `<input type="text" [formControl]="name" appCapitalizeFirst />`
})
class TestHostComponent {
  name = new FormControl('');
}

describe('CapitalizeFirstDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let inputEl: DebugElement;
  let control: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CapitalizeFirstDirective, TestHostComponent],
      providers: [
        {
          provide: NgControl,
          useFactory: () => ({
            control: new FormControl()
          })
        },
        // Evita errores si usas Angular Material y se inyecta un ErrorStateMatcher
        { provide: ErrorStateMatcher, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    inputEl = fixture.debugElement.query(By.css('input'));
    control = (fixture.componentInstance.name as FormControl);
  });

  it('should capitalize the first letter of input value', () => {
    const input = inputEl.nativeElement as HTMLInputElement;

    input.value = 'angular';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(control.value).toBe('Angular');
  });

  it('should emit value change event when insert text', () => {
    let emitted = false;
    control.valueChanges.subscribe(() => emitted = true);

    const input = inputEl.nativeElement as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(emitted).toBeTrue();
    expect(control.value).toBe('Test');
  });
});
