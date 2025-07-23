import { Injectable, signal } from '@angular/core';
import { Hero } from '../../domain/entities/hero';

@Injectable({ providedIn: 'root' })
export class HeroStateService {

    private heroesSignal = signal<Hero[]>([]);

    heroes = this.heroesSignal.asReadonly();

    constructor() { }

    addHero(hero: Hero): void {
        this.heroesSignal.update(current => [...current, hero]);
    }

    removeHero(id: string): void {
        this.heroesSignal.update(current => current.filter(hero => hero.id !== id));
    }

    setHeroes(heroes: Hero[]): void {
        this.heroesSignal.set(heroes);
    }

    clear(): void {
        this.heroesSignal.set([]);
    }
}