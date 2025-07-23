import { TestBed } from '@angular/core/testing';
import { HeroStateService } from './hero-state.services';
import { Hero } from '../../domain/entities/hero';
import { HeroService } from './hero.services';

class MockHeroStateService {
  private heroesList: Hero[] = [];
  
  heroes = () => this.heroesList;

  addHero(hero: Hero) {
    this.heroesList.push(hero);
  }

  removeHero(id: string) {
    this.heroesList = this.heroesList.filter(h => h.id !== id);
  }
}

describe('HeroService', () => {
  let service: HeroService;
  let heroState: MockHeroStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: HeroStateService, useClass: MockHeroStateService }
      ]
    });
    service = TestBed.inject(HeroService);
    heroState = TestBed.inject(HeroStateService) as unknown as MockHeroStateService;
  });

  it('Should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('Should add a hero when calling addHero()', () => {
    const hero: Hero = { id: '1', name: 'Batman', power: 'Detective skills' };
    service.addHero(hero);
    expect(heroState.heroes()).toContain(hero);
  });

  it('Should remove a hero when calling removeHero()', () => {
    const hero1: Hero = { id: '1', name: 'Batman', power: 'Detective skills' };
    const hero2: Hero = { id: '2', name: 'Superman', power: 'Super strength' };
    heroState.addHero(hero1);
    heroState.addHero(hero2);

    service.removeHero('1');
    expect(heroState.heroes().length).toBe(1);
    expect(heroState.heroes()[0].id).toBe('2');
  });

  it('Should get a hero by id when calling getHero()', () => {
    const hero: Hero = { id: '10', name: 'Flash', power: 'Super speed' };
    heroState.addHero(hero);

    const result = service.getHero('10');
    expect(result).toEqual(hero);
  });

  it('Should return all heroes if no filter is applied', () => {
    const hero1: Hero = { id: '1', name: 'Batman', power: 'Detective skills' };
    const hero2: Hero = { id: '2', name: 'Superman', power: 'Super strength' };
    heroState.addHero(hero1);
    heroState.addHero(hero2);

    const result = service.getHeroes();
    expect(result.length).toBe(2);
  });

  it('Should return filtered heroes by name when calling getHeroes() with a name filter', () => {
    const hero1: Hero = { id: '1', name: 'Batman', power: 'Detective skills' };
    const hero2: Hero = { id: '2', name: 'Superman', power: 'Super strength' };
    heroState.addHero(hero1);
    heroState.addHero(hero2);

    const result = service.getHeroes('Bat');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Batman');
  });

  it('Should filter heroes by id when calling filterHeroById()', () => {
    const hero1: Hero = { id: '1', name: 'Batman', power: 'Detective skills' };
    const hero2: Hero = { id: '2', name: 'Superman', power: 'Super strength' };
    heroState.addHero(hero1);
    heroState.addHero(hero2);

    const result = service.filterHeroById('2');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('2');
  });
});