import { TestBed } from '@angular/core/testing';
import { IHero } from '../../domain/entities/hero';
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
    const hero: IHero = { id: '1', name: 'Batman', power: 'Detective skills' };
    service.addHero(hero);

    const result = service.state();
    expect(result.heroes?.length).toBe(7);
    expect(result.heroes?.[0].name).toEqual(hero.name);
  });

  it('should set a hero when calling setHero()', () => {
    const hero: IHero = { id: '1', name: 'Batman', power: 'Detective skills' };
    service.setHero(hero);    
    const result = service.state();
    expect(result.heroes?.length).toBe(6);
    expect(result.heroes?.[0].name).toEqual(hero.name);
    expect(result.heroes?.[0].power).toEqual(hero.power);
  });

  it('Should remove a hero when calling removeHero()', () => {
    const hero1: IHero = { id: '1', name: 'Batman', power: 'Detective skills' };
    const hero2: IHero = { id: '2', name: 'Superman', power: 'Super strength' };
    service.setHeroes([hero1, hero2]);

    service.removeHero('1');
    const result = service.state();

    expect(result.heroes?.length).toBe(1);
    expect(result.heroes?.[0].id).toBe('2');
  });

  it('Should replace the entire list when calling setHeroes()', () => {
    const hero1: IHero = { id: '1', name: 'Flash', power: 'Speed' };
    const hero2: IHero = { id: '2', name: 'Wonder Woman', power: 'Strength' };

    service.setHeroes([hero1, hero2]);
    const result = service.state();

    expect(result.heroes).toEqual([hero1, hero2]);
  });

  it('Should clear the list when calling clear()', () => {
    const hero: IHero = { id: '1', name: 'Aquaman' , power: 'Water control' };
    service.addHero(hero);

    service.clear();
    expect(service.state().heroes).toEqual([]);
  });

  it('Should allow adding multiple heroes consecutively', () => {
    const hero1: IHero = { id: '1', name: 'Green Lantern', power: 'Power ring' };
    const hero2: IHero = { id: '2', name: 'Hawkgirl', power: 'Flight' };

    service.addHero(hero1);
    service.addHero(hero2);

    const result = service.state();

    expect(result.heroes?.length).toBe(8);
    expect(result.heroes).toContain(hero1);
    expect(result.heroes).toContain(hero2);
  });
});
