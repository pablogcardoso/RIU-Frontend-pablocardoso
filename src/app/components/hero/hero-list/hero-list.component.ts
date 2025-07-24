import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild} from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { IHero } from '../../../domain/entities/hero';
import { HeroService } from '../../services/hero.services';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { HeroViewComponent } from '../hero-view/hero-view.component';

@Component({
  selector: 'app-hero-list',
  imports: [SharedModule, MatPaginatorModule],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListComponent implements OnInit {

  displayedColumns: string[] = ['id','name', 'power', 'actions'];
  dataSource = new MatTableDataSource([] as IHero[]);
  readonly dialog = inject(MatDialog);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly heroService: HeroService) { }

  ngOnInit() {
    this.dataSource.data = this.heroService.getHeroes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  

  deleteHero(hero: IHero) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '0.5s',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.removeHero(hero.id);
        this.dataSource.data = this.heroService.getHeroes();
      }
    });
  }

  addHero() {
    const dialogRef = this.dialog.open(HeroViewComponent, {      
      width: '400px',
      enterAnimationDuration: '0.5s',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.heroService.getHeroes();
      }
    });
  }

  editHero(hero: IHero) {
    const dialogRef = this.dialog.open(HeroViewComponent, {
      width: '400px',
      enterAnimationDuration: '0.5s',
      data: { hero }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.heroService.getHeroes();
      }
    });
  }

  applyFilter(search: string) {
    this.dataSource.data = this.heroService.getHeroes(search);
  }
}
