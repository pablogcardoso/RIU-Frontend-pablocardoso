import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { CapitalizeFirstDirective } from './hero-capitalize-first';

@Component({
  template: `<input type="text" [formControl]="control" appCapitalizeFirst />`
})
class TestHostComponent {
  control = new FormControl('');
}

describe('CapitalizeFirstDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [TestHostComponent, CapitalizeFirstDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should create the host component', () => {
    expect(component).toBeTruthy();
  });

  it('should capitalize the first letter on input', () => {
    inputElement.value = 'superman';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.control.value).toBe('Superman');
  });

  it('should keep the rest of the string unchanged after capitalizing the first letter', () => {
    inputElement.value = 'batman';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.control.value).toBe('Batman');
  });

  it('should not throw error when input is empty', () => {
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.control.value).toBe('');
  });
});
