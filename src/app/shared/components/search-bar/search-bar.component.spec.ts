import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent (signals)', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, MatCardModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display default placeholder text', () => {
    const input: HTMLInputElement = inputEl.nativeElement;
    expect(input.placeholder).toBe('Buscar');
  });

  it('should use custom placeholder when it is provided', () => {
    fixture.componentRef.setInput('placeholder', 'Buscar héroe');
    fixture.detectChanges();

    const input: HTMLInputElement = inputEl.nativeElement;
    expect(input.placeholder).toBe('Buscar héroe');
  });

  it('should emit value when typing in input', () => {
    let emittedValue = '';
    component.searchEvent.subscribe((val: string) => emittedValue = val);

    const input: HTMLInputElement = inputEl.nativeElement;
    input.value = '  Batman ';
    input.dispatchEvent(new Event('input'));

    expect(emittedValue).toBe('Batman');
  });
});
