import { Injectable, signal } from '@angular/core';
import { IHero } from '../../domain/entities/hero';
import { AppState } from '../../state/app-state';
import { HEROES_DEFAULT } from '../../domain/constants/heroes-default';
/**
 * Nota para el Challenge:
 * La premisa de este servicio es que el estado de la aplicación se maneja a través de señales.
 * Solo se usan funciones puras para manipular el estado y evitar errores.
 * No elegi usar NgRx ya que la aplicacion es pequeña y su estado es simple era mas rapido y sencillo usar señales. 
 */
@Injectable({ providedIn: 'root' })
export class HeroStateService {

    private stateSignal = signal<AppState>({ heroes: [...HEROES_DEFAULT], filters: { name: '', id: '' } });
    
    state = this.stateSignal.asReadonly();

    constructor() { }

    addHero(hero: IHero): void {
        this.stateSignal.update(current => {
            const updatedHeroes = [...current.heroes || [], hero];
            return { ...current, heroes: updatedHeroes };
        });
    }

    removeHero(id: string): void {
        this.stateSignal.update(current => {
            return { ...current, heroes: current.heroes?.filter(hero => hero.id !== id) };
        });
    }

    setHeroes(heroes: IHero[]): void {
        this.stateSignal.set({ ...this.state, heroes });
    }

    clear(): void {
        this.stateSignal.set({ heroes: [], filters: { name: '', id: '' } });
    }
}