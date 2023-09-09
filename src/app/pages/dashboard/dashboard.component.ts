import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero';
import { HeroService } from 'src/app/services/hero.service';

/**
 * @author Youri Janssen //entire file
 * Component for displaying a dashboard of heroes.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  /** An array containing the heroes to be displayed on the dashboard. */
  public heroes: Hero[] = [];

  /**
   * Creates an instance of DashboardComponent.
   * @param heroService - The hero service for retrieving hero data.
   */
  constructor(private heroService: HeroService) {}

  /** Lifecycle hook called after component initialization. */
  ngOnInit(): void {
    this.getHeroes();
  }

  /** Retrieves a subset of heroes to be displayed on the dashboard. */
  private getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
}
