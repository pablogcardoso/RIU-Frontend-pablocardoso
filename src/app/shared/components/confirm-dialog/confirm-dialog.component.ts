import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { SharedModule } from '../../shared.module';
@Component({
    selector: 'selector-name',
    standalone: true,
    imports: [SharedModule, MatDialogActions, MatDialogTitle, MatDialogContent],
    template: `
    <h2 mat-dialog-title>Eliminar Heroe</h2>
    <mat-dialog-content>
        ¿Confirma eliminar el Heroe seleccionado?
    </mat-dialog-content>
    <mat-dialog-actions class="confirm-dialog-actions">
        <button mat-icon-button color="warn" (click)="cancel()">
            <mat-icon>cancel</mat-icon>
        </button>
        <button mat-icon-button color="primary" (click)="confirm()" cdkFocusInitial>
            <mat-icon>check</mat-icon>
        </button>
    </mat-dialog-actions>
`,
    styles: [`
        .confirm-dialog-actions {
            display: flex;
            justify-content: flex-end;
        }
    `],
})

export class ConfirmDialogComponent {
    readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

    cancel(): boolean {
        this.dialogRef.close(false);
        return false;
    }

    confirm(): boolean {
        this.dialogRef.close(true);
        return true;
    }
}