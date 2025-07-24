import { Component, inject, model, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CapitalizeFirstDirective } from '../../../shared/directives/hero-capitalize-first';
import { SharedModule } from '../../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { HeroService } from '../../services/hero.services';
import { HeroViewDataParam } from '../../../domain/entities/hero-view-data-param';

@Component({
  selector: 'app-hero-view',
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CapitalizeFirstDirective,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent],
  standalone: true,
  templateUrl: './hero-view.component.html',
  styleUrl: './hero-view.component.scss'
})
export class HeroViewComponent implements OnInit {

  heroForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    power: new FormControl('', [Validators.required, Validators.maxLength(40)])
  });

  readonly dialogRef = inject(MatDialogRef<HeroViewComponent>);
  readonly data = inject<HeroViewDataParam>(MAT_DIALOG_DATA);
  readonly hero = model(this.data?.hero);
  readonly editMode = this.hero() ? true : false;

  errorApplying: boolean = false;

  constructor(private readonly heroService: HeroService) {
  }

  ngOnInit() {
    if (this.editMode) {
      this.heroForm.patchValue({
        id: this.hero()?.id,
        name: this.hero()?.name,
        power: this.hero()?.power
      });
    }
  }
  cancel(): boolean {
    this.dialogRef.close(false);
    return false;
  }

  confirm(): boolean {
    const result = this.heroService.addHero(this.heroForm.getRawValue());
    if (!result) {
      this.errorApplying = true;
      return false;
    }
    this.dialogRef.close(true);
    return true;
  }

  update(): boolean {
    const result = this.heroService.updateHero(this.heroForm.getRawValue());
    if (!result) {
      this.errorApplying = true;
      return false;
    }
    this.dialogRef.close(true);
    return true;
  }

  get name() {
    return this.heroForm.get('name') as FormControl;
  }

  get power() {
    return this.heroForm.get('power') as FormControl;
  }
}
