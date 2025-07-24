import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroViewComponent } from './hero-view.component';
import { HeroService } from '../../services/hero.services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroViewComponent', () => {
  let component: HeroViewComponent;
  let fixture: ComponentFixture<HeroViewComponent>;
  let heroServiceMock: jasmine.SpyObj<HeroService>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<HeroViewComponent>>;

  const heroMock = {
    id: 1,
    name: 'Superman',
    power: 'Flying'
  };

  beforeEach(async () => {
    heroServiceMock = jasmine.createSpyObj('HeroService', ['addHero', 'updateHero']);
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [HeroViewComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: HeroService, useValue: heroServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { hero: heroMock } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with a hero in edit mode', () => {
    expect(component.heroForm.value.name).toBe('Superman');
    expect(component.heroForm.value.power).toBe('Flying');
  });

  it('should close the dialog with false when cancel() is called', () => {
    component.cancel();
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });

  it('should call addHero and close dialog when confirm() is successful', () => {
    heroServiceMock.addHero.and.returnValue(true);
    const result = component.confirm();
    expect(heroServiceMock.addHero).toHaveBeenCalled();
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
    expect(result).toBeTrue();
  });

  it('should set errorApplying to true when confirm() fails', () => {
    heroServiceMock.addHero.and.returnValue(false);
    const result = component.confirm();
    expect(component.errorApplying).toBeTrue();
    expect(result).toBeFalse();
    expect(dialogRefMock.close).not.toHaveBeenCalledWith(true);
  });

  it('should call updateHero and close dialog when update() is successful', () => {
    heroServiceMock.updateHero.and.returnValue(true);
    const result = component.update();
    expect(heroServiceMock.updateHero).toHaveBeenCalled();
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
    expect(result).toBeTrue();
  });

  it('should set errorApplying to true when update() fails', () => {
    heroServiceMock.updateHero.and.returnValue(false);
    const result = component.update();
    expect(component.errorApplying).toBeTrue();
    expect(result).toBeFalse();
    expect(dialogRefMock.close).not.toHaveBeenCalledWith(true);
  });

  it('should validate that name is required', () => {
    component.name.setValue('');
    expect(component.name.invalid).toBeTrue();
    expect(component.name.hasError('required')).toBeTrue();
  });

  it('should validate that power is required', () => {
    component.power.setValue('');
    expect(component.power.invalid).toBeTrue();
    expect(component.power.hasError('required')).toBeTrue();
  });
});
