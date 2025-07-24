import { Injectable } from '@angular/core';
import { HeroStateService } from './hero-state.services';
import { IHero } from '../../domain/entities/hero';

@Injectable({providedIn: 'root'})
export class HeroService {

    constructor(private readonly heroState:HeroStateService) { }
    
    addHero(hero: IHero): void {
        this.heroState.addHero(hero);
    }

    removeHero(heroId: string): void {
        this.heroState.removeHero(heroId);
    }

    getHero(heroId: string): IHero | undefined {
        const heroes = this.heroState.state().heroes || [];
        return heroes.find((hero: IHero) => hero.id === heroId);
    }

    getHeroes(filterName?: string): IHero[] {
        const heroes = this.heroState.state().heroes || [];
        if (filterName) {
            return heroes.filter((hero: IHero) => hero.name.includes(filterName));
        }
        return heroes;
    }

    filterHeroById(id: string): IHero[] {
        const heroes = this.heroState.state().heroes || [];
        return heroes.filter((hero: IHero) => hero.id === id);
    }
}