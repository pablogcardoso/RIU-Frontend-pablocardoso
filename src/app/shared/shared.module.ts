import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatInputModule } from '@angular/material/input';
/**
 * Para esta prueba tecnica cree el modulo shared para controlar mejor la gestion de componentes y modulos reutilizables.
 * En este modulo encapsule los componentes y modulos que se comparten entre diferentes modulos de la aplicacion.
 * Tenemos componentes standalone, non-standalone y modulos de Angular Material.
 */
const standaloneComponentsAndModules = [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatInputModule,
    MatCardHeader
];

const components = [
    SearchBarComponent
];

@NgModule({
    imports: [
        ...standaloneComponentsAndModules
    ],
    exports: [
        ...standaloneComponentsAndModules, ...components
    ],
    declarations: [...components],
    providers: [],
})
export class SharedModule { }
