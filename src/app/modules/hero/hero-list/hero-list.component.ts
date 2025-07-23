import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Hero } from '../../../domain/entities/hero';
import { HeroService } from '../../services/hero.services';

@Component({
  selector: 'app-hero-list',
  imports: [SharedModule],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'power', 'actions'];
  dataSource = new MatTableDataSource([] as Hero[]);

  constructor(private readonly heroService: HeroService) { }

  ngOnInit() {
    this.dataSource.data = this.heroService.getHeroes();
  }

  editHero(hero: Hero) {
  }

  deleteHero(hero: Hero) {
    this.heroService.removeHero(hero.id);
    this.dataSource.data = this.heroService.getHeroes();
  }

  addHero() {    
  }
}
