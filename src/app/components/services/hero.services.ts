import { Injectable } from '@angular/core';
import { HeroStateService } from './hero-state.services';
import { IHero } from '../../domain/entities/hero';

@Injectable({providedIn: 'root'})
export class HeroService {

    constructor(private readonly heroState: HeroStateService) { }

    addHero(hero: IHero): boolean {
        return this.heroState.addHero({...hero, id: this.generateId()});
    }

    removeHero(heroId: string): void {
        this.heroState.removeHero(heroId);
    }

    updateHero(hero: IHero): boolean {
        this.heroState.setHero(hero);
        return true;
    }

    getHero(heroId: string): IHero | undefined {
        const heroes = this.heroState.state().heroes || [];
        return heroes.find((hero: IHero) => hero.id === heroId);
    }

    getHeroes(filterName?: string): IHero[] {
        const heroes = this.heroState.state().heroes || [];
        if (filterName) {
            return heroes.filter((hero: IHero) => hero.name.toLowerCase().includes(filterName));
        }
        return heroes;
    }

    filterHeroById(id: string): IHero[] {
        const heroes = this.heroState.state().heroes || [];
        return heroes.filter((hero: IHero) => hero.id === id);
    }

    generateId(): string {
        return "H" + Math.random().toString().substring(2, 10);
    }
}