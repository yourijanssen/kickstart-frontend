import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from 'src/app/interfaces/hero';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

/**
 * Describe a test suite for the HeroesComponent.
 */
describe('HeroesComponent test suite', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  // Sample hero data for testing.
  const heroesData: Hero[] = [
    { id: 1, name: 'Hero 1' },
    { id: 2, name: 'Hero 2' },
    { id: 3, name: 'Hero 3' },
  ];

  /**
   * Configure the testing environment before each test case.
   */
  beforeEach(() => {
    // Create a spy object for HeroService
    mockHeroService = jasmine.createSpyObj('HeroService', [
      'getHeroes',
      'deleteHero',
      'getHeroesByName',
      'createHero',
    ]);
    mockHeroService.getHeroes.and.returnValue(of(heroesData));
    mockHeroService.deleteHero.and.returnValue(of(undefined));
    mockHeroService.getHeroesByName.and.returnValue(of([]));
    mockHeroService.createHero.and.returnValue(of({ id: 5 }));

    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      imports: [FormsModule, RouterModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  /**
   * Test case: Ensure that the component is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test case: Verify that heroes are retrieved on component initialization.
   */
  it('should retrieve heroes on ngOnInit', () => {
    fixture.detectChanges();

    expect(component.heroes).toEqual(heroesData);
  });

  /**
   * Test case: Verify that a hero is deleted successfully.
   */
  it('should delete a hero', () => {
    fixture.detectChanges();
    const heroToDelete = heroesData[0];
    const deleteHeroSpy = spyOn(window, 'confirm').and.returnValue(true);

    component.deleteHero(heroToDelete.id);

    expect(deleteHeroSpy).toHaveBeenCalledWith('Are you sure you want to delete this hero?');
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroToDelete.id);
    expect(component.heroes).not.toContain(heroToDelete);
  });

  /**
   * Test case: Verify that heroes are searched by name.
   */
  it('should search for heroes by name', () => {
    const searchTerm = 'Hero 2';
    mockHeroService.getHeroesByName.and.returnValue(of([heroesData[1]]));

    component.searchHeroByName(searchTerm);

    expect(mockHeroService.getHeroesByName).toHaveBeenCalledWith(searchTerm);
    expect(component.searchedHeroesByName).toEqual([heroesData[1]]);
  });

  /**
   * Test case: Verify that a new hero is created.
   */
  it('should create a new hero', () => {
    fixture.detectChanges();
    const newHeroName = 'New Hero';
    const createHeroForm = {
      value: {
        newHeroName: newHeroName,
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      resetForm: () => {},
    } as NgForm;

    component.createHero(createHeroForm);

    expect(mockHeroService.createHero).toHaveBeenCalledWith(newHeroName);
    expect(component.heroes.length).toBe(heroesData.length);
  });
});
