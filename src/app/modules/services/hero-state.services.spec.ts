import { TestBed } from '@angular/core/testing';
import { Hero } from '../../domain/entities/hero';
import { HeroStateService } from './hero-state.services';

describe('HeroStateService', () => {
  let service: HeroStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroStateService]
    });
    service = TestBed.inject(HeroStateService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should add a hero when calling addHero()', () => {
    const hero: Hero = { id: '1', name: 'Batman', power: 'Detective skills' };
    service.addHero(hero);

    const result = service.heroes();
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(hero);
  });

  it('Should remove a hero when calling removeHero()', () => {
    const hero1: Hero = { id: '1', name: 'Batman', power: 'Detective skills' };
    const hero2: Hero = { id: '2', name: 'Superman', power: 'Super strength' };
    service.setHeroes([hero1, hero2]);

    service.removeHero('1');
    const result = service.heroes();

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('2');
  });

  it('Should replace the entire list when calling setHeroes()', () => {
    const hero1: Hero = { id: '1', name: 'Flash', power: 'Speed' };
    const hero2: Hero = { id: '2', name: 'Wonder Woman', power: 'Strength' };

    service.setHeroes([hero1, hero2]);
    const result = service.heroes();

    expect(result).toEqual([hero1, hero2]);
  });

  it('Should clear the list when calling clear()', () => {
    const hero: Hero = { id: '1', name: 'Aquaman' , power: 'Water control' };
    service.addHero(hero);

    service.clear();
    expect(service.heroes()).toEqual([]);
  });

  it('Should allow adding multiple heroes consecutively', () => {
    const hero1: Hero = { id: '1', name: 'Green Lantern', power: 'Power ring' };
    const hero2: Hero = { id: '2', name: 'Hawkgirl', power: 'Flight' };

    service.addHero(hero1);
    service.addHero(hero2);

    const result = service.heroes();
    expect(result.length).toBe(2);
    expect(result).toContain(hero1);
    expect(result).toContain(hero2);
  });
});
