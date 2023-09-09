import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero';
import { HeroService } from 'src/app/services/hero.service';

/**
 * @author Youri Janssen //entire file
 * Component for displaying a list of heroes.
 */
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  /** An array containing the list of heroes to be displayed. */
  public heroes: Hero[] = []; // "public" access modifier

  /**
   * Creates an instance of HeroesComponent.
   * @param heroService - The hero service for retrieving hero data.
   */
  constructor(private heroService: HeroService) {}

  /**
   * Lifecycle hook called after component initialization.
   * Retrieves the list of heroes to be displayed.
   */
  ngOnInit(): void {
    this.getHeroes();
  }

  /** Retrieves the list of heroes to be displayed. */
  private getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }
}
