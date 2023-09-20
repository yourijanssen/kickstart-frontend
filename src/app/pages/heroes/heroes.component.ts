import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hero } from 'src/app/interfaces/hero';
import { HeroService } from 'src/app/services/hero.service';

/**
 * Component for displaying a list of heroes.
 * @class HeroesComponent
 */
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];
  public searchedHeroesByName: Hero[] = [];
  public searchTerm = '';
  public newHeroName = '';

  /**
   * Creates an instance of HeroesComponent.
   * @param {HeroService} heroService - The hero service for retrieving hero data.
   */
  constructor(private heroService: HeroService) {}

  /**
   * Lifecycle hook called after component initialization.
   * Retrieves the list of heroes to be displayed.
   */
  ngOnInit(): void {
    this.getHeroes();
  }

  /**
   * Retrieves the list of heroes to be displayed.
   */
  private getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }

  /**
   * Deletes a hero by their ID.
   * @param {number} id - The ID of the hero to delete.
   */
  deleteHero(id: number): void {
    if (confirm('Are you sure you want to delete this hero?')) {
      this.heroService.deleteHero(id).subscribe(() => {
        this.heroes = this.heroes.filter(hero => hero.id !== id);
      });
    }
  }

  /**
   * Searches for heroes by name and displays the results.
   * @param {string} name - The name to search for.
   */
  searchHeroByName(name: string): void {
    this.heroService.getHeroesByName(name).subscribe(heroes => {
      this.searchedHeroesByName = heroes; // Assign the found heroes to the array
    });
  }

  /**
   * Creates a new hero with the given name.
   * @param {NgForm} form - The form containing the new hero's name.
   */
  createHero(form: NgForm): void {
    // Extract the new hero name from the form
    const newHeroName = form.value.newHeroName;
    if (newHeroName) {
      this.heroService.createHero(newHeroName).subscribe(heroId => {
        if (heroId) {
          // Hero creation was successful, add the new hero to the list
          const newHero: Hero = { id: heroId, name: newHeroName };
          this.heroes.push(newHero);

          // Clear the form input
          form.resetForm();
        }
      });
    }
  }
}
