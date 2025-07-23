import { Injectable } from '@angular/core';
import { HeroStateService } from './hero-state.services';
import { Hero } from '../../domain/entities/hero';

@Injectable({providedIn: 'root'})
export class HeroService {

    constructor(private readonly heroState:HeroStateService) { }
    
    addHero(hero: Hero): void {
        this.heroState.addHero(hero);
    }

    removeHero(heroId: string): void {
        this.heroState.removeHero(heroId);
    }

    getHero(heroId: string): Hero | undefined {
        const hero = this.heroState.heroes();
        return hero.find(h => h.id === heroId);
    }

    getHeroes(filterName?: string): Hero[] {
        const heroes = this.heroState.heroes();
        if (filterName) {
            return heroes.filter(hero => hero.name.includes(filterName));
        }
        return heroes;
    }

    filterHeroById(id: string): Hero[] {
        const heroes = this.heroState.heroes();
        return heroes.filter(hero => hero.id === id);
    }
}