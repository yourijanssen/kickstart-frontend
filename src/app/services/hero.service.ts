import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../mocks/mock-heroes';

/**
 * @author Youri Janssen //entire file
 * A service for managing Hero data.
 */
@Injectable({ providedIn: 'root' })
export class HeroService implements OnDestroy {
  /**
   * Retrieves a list of all heroes.
   * @returns An Observable containing a single array of Hero objects.
   */
  public getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }

  /**
   * Retrieves a hero by their ID.
   * @param id - The ID of the hero to retrieve.
   * @returns An Observable containing the Hero object with the specified ID.
   */
  public getHeroById(id: number): Observable<Hero | undefined> {
    const hero = HEROES.find((h: { id: number }) => h.id === id);
    return of(hero || undefined);
  }

  /**
   * Cleanup method to implement OnDestroy interface.
   */
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  public ngOnDestroy(): void {
    // Will be added when external API is implemented
  }
}
