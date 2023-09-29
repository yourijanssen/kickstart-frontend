import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly heroesUrl: string = 'http://localhost:3002/hero';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of all heroes.
   * @returns An Observable containing a single array of Hero objects.
   */
  public getHeroes(): Observable<Hero[]> {
    const url = `${this.heroesUrl}/all`;
    return this.http.get<Hero[]>(url);
  }

  /**
   * Retrieves a hero by their ID.
   * @param id - The ID of the hero to retrieve.
   * @returns An Observable containing the Hero object with the specified ID.
   */
  public getHeroById(id: number): Observable<Hero | undefined> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero | undefined>(url);
  }

  /**
   * Retrieves a hero by their name.
   * @param name - The name of the hero to retrieve.
   * @returns An Observable containing the Hero object with the specified name.
   */
  public getHeroByName(name: string): Observable<Hero | undefined> {
    const url = `${this.heroesUrl}/name/${name}`;
    return this.http.get<Hero | undefined>(url);
  }

  /**
   * Retrieves a list of heroes with a specific name.
   * @param name - The name of the heroes to retrieve.
   * @returns An Observable containing an array of Hero objects with the specified name.
   */
  public getHeroesByName(name: string): Observable<Hero[]> {
    const url = `${this.heroesUrl}/names/${name}`;
    return this.http.get<Hero[]>(url);
  }

  /**
   * Updates the name of a hero by their ID.
   * @param id - The ID of the hero to update.
   * @param newName - The new name for the hero.
   * @returns An Observable indicating the success of the update.
   */
  public updateHeroNameById(id: number, newName: string): Observable<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.put<void>(url, { name: newName });
  }

  /**
   * Creates a new hero with the given name.
   * @param name - The name of the new hero.
   * @returns An Observable containing the ID of the newly created hero.
   */
  public createHero(name: string): Observable<{ id: number }> {
    const url = `${this.heroesUrl}`;
    return this.http.post<{ id: number }>(url, { name });
  }

  /**
   * Deletes a hero by their ID.
   * @param id - The ID of the hero to delete.
   * @returns An Observable indicating the success of the deletion.
   */
  public deleteHero(id: number): Observable<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
