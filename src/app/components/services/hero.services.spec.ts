import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.services';
import { HeroStateService } from './hero-state.services';
import { IHero } from '../../domain/entities/hero';

describe('HeroService', () => {
  let service: HeroService;
  let heroStateMock: jasmine.SpyObj<HeroStateService>;

  const heroesMock: IHero[] = [
    { id: 'H123', name: 'Superman', power: 'Flying' },
    { id: 'H456', name: 'Batman', power: 'Martial Arts' }
  ];

  beforeEach(() => {
    heroStateMock = jasmine.createSpyObj('HeroStateService', ['addHero', 'removeHero', 'setHero', 'state']);

    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: HeroStateService, useValue: heroStateMock }
      ]
    });

    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call addHero with a generated id when adding a hero', () => {
    const hero: IHero = { id: '', name: 'Flash', power: 'Speed' };
    heroStateMock.addHero.and.returnValue(true);

    const result = service.addHero(hero);

    expect(heroStateMock.addHero).toHaveBeenCalled();
    expect(result).toBeTrue();
    const addedHero = heroStateMock.addHero.calls.mostRecent().args[0];
    expect(addedHero.id).toContain('H'); // generated id
  });

  it('should call removeHero with correct heroId', () => {
    service.removeHero('H123');
    expect(heroStateMock.removeHero).toHaveBeenCalledWith('H123');
  });

  it('should call setHero and return true when updating a hero', () => {
    const hero: IHero = { id: 'H456', name: 'Batman', power: 'Martial Arts' };
    const result = service.updateHero(hero);

    expect(heroStateMock.setHero).toHaveBeenCalledWith(hero);
    expect(result).toBeTrue();
  });

  it('should return hero by id when call getHero()', () => {
    heroStateMock.state.and.returnValue({ heroes: heroesMock });

    const hero = service.getHero('H123');

    expect(hero).toEqual(heroesMock[0]);
  });

  it('should return undefined when hero does not exist in getHero', () => {
    heroStateMock.state.and.returnValue({ heroes: heroesMock });

    const hero = service.getHero('H999');

    expect(hero).toBeUndefined();
  });

  it('should return all heroes when getHeroes has no filter', () => {
    heroStateMock.state.and.returnValue({ heroes: heroesMock });

    const result = service.getHeroes();

    expect(result.length).toBe(2);
    expect(result).toEqual(heroesMock);
  });

  it('should return filtered heroes when getHeroes() has a filter name', () => {
    heroStateMock.state.and.returnValue({ heroes: heroesMock });

    const result = service.getHeroes('super');

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Superman');
  });

  it('should filter heroes by id when call filterHeroById()', () => {
    heroStateMock.state.and.returnValue({ heroes: heroesMock });

    const result = service.filterHeroById('H123');

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('H123');
  });

  it('should generate a valid id when call to generateId()', () => {
    const id = service.generateId();
    expect(id.startsWith('H')).toBeTrue();
    expect(id.length).toBeGreaterThan(1);
  });
});
