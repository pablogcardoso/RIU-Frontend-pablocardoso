import { Routes } from '@angular/router';
import { HeroListComponent } from './modules/hero/hero-list/hero-list.component';

export const routes: Routes = [
    { path: '', component: HeroListComponent },
    { path: 'heroes', component: HeroListComponent }
];
