import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from 'src/app/interfaces/hero';
import { HeroService } from 'src/app/services/hero.service';

/**
 * @author Youri Janssen //entire file
 * Component for displaying hero details.
 */
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  /** The hero to be displayed. Undefined if hero id does not exist */
  public hero: Hero | undefined;
  public newHeroName = ''; // Add this variable

  /**
   * Creates an instance of HeroDetailComponent.
   * @param route - The activated route, used for retrieving route parameters.
   * @param heroService - The hero service for retrieving hero details.
   * @param location - The location service for navigation.
   */
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  /** Lifecycle hook called after component initialization. */
  ngOnInit(): void {
    this.getHero();
  }

  /** Retrieves the hero details based on the route parameter. */
  private getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHeroById(id).subscribe(hero => (this.hero = hero));
  }

  /** Navigates back to the previous page. */
  public goBack(): void {
    this.location.back();
  }

  /**
   * Updates the hero's name.
   * Checks if the hero object exists and if the new name is not empty.
   */
  public updateHeroName(): void {
    if (this.hero && this.newHeroName.trim()) {
      this.heroService.updateHeroNameById(this.hero.id, this.newHeroName).subscribe(() => {
        // Update the hero's name locally
        if (this.hero) {
          this.hero.name = this.newHeroName;
        }
      });
    }
  }
}
