import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../../services/hero.services';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IHero } from '../../../domain/entities/hero';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroServiceMock: jasmine.SpyObj<HeroService>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  const heroesMock: IHero[] = [
    { id: 'H123', name: 'Superman', power: 'Flying' },
    { id: 'H456', name: 'Batman', power: 'Martial Arts' }
  ];

  beforeEach(async () => {
    heroServiceMock = jasmine.createSpyObj('HeroService', ['getHeroes', 'removeHero']);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    heroServiceMock.getHeroes.and.returnValue(heroesMock);
    dialogMock.open.and.returnValue({
      afterClosed: () => of(false)
    } as any);

    await TestBed.configureTestingModule({
      imports: [HeroListComponent, NoopAnimationsModule],
      providers: [
        { provide: HeroService, useValue: heroServiceMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load heroes on ngOnInit', () => {
    expect(heroServiceMock.getHeroes).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(heroesMock);
  });

  it('should call heroService.removeHero when deleteHero is confirmed', () => {
    const hero: IHero = { id: 'H123', name: 'Superman', power: 'Flying' };

    dialogMock.open.and.returnValue({
      afterClosed: () => of(true)
    } as any);

    component.deleteHero(hero);

    expect(dialogMock.open).toHaveBeenCalled();
    expect(heroServiceMock.removeHero).toHaveBeenCalledWith(hero.id);
    expect(component.dataSource.data).toEqual(heroesMock);
  });

  it('should not call removeHero when deleteHero is canceled', () => {
    const hero: IHero = { id: 'H123', name: 'Superman', power: 'Flying' };
    dialogMock.open.and.returnValue({
      afterClosed: () => of(false)
    } as any);

    component.deleteHero(hero);

    expect(heroServiceMock.removeHero).not.toHaveBeenCalled();
  });

  it('should refresh heroes after adding hero when dialog closes with true', () => {
    dialogMock.open.and.returnValue({
      afterClosed: () => of(true)
    } as any);

    component.addHero();

    expect(dialogMock.open).toHaveBeenCalled();
    expect(heroServiceMock.getHeroes).toHaveBeenCalledTimes(2); // initial + refresh
  });

  it('should refresh heroes after editing hero when dialog closes with true', () => {
    const hero: IHero = { id: 'H123', name: 'Superman', power: 'Flying' };
    dialogMock.open.and.returnValue({
      afterClosed: () => of(hero)
    } as any);

    component.editHero(hero);

    expect(dialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), jasmine.objectContaining({
      data: { hero }
    }));
    expect(heroServiceMock.getHeroes).toHaveBeenCalledTimes(2);
  });

  it('should apply filter and update dataSource when search by name', () => {
    heroServiceMock.getHeroes.and.returnValue([heroesMock[1]]);

    component.applyFilter('bat');

    expect(heroServiceMock.getHeroes).toHaveBeenCalledWith('bat');
    expect(component.dataSource.data).toEqual([heroesMock[1]]);
  });
});
