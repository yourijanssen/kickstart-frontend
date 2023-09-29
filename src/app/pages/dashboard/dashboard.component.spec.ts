import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HeroService } from 'src/app/services/hero.service';
import { of } from 'rxjs';
import { Hero } from 'src/app/interfaces/hero';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
/**
 * Unit tests for the DashboardComponent.
 */
describe('DashboardComponent test suite', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  // Sample hero data for testing
  const heroesData: Hero[] = [
    { id: 1, name: 'Hero 1' },
    { id: 2, name: 'Hero 2' },
    { id: 3, name: 'Hero 3' },
    { id: 4, name: 'Hero 4' },
    { id: 5, name: 'Hero 5' },
  ];

  // Set up test environment before each test
  beforeEach(() => {
    // Create a mock HeroService
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    mockHeroService.getHeroes.and.returnValue(of(heroesData));

    // Configure the testing module
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      imports: [RouterModule, RouterTestingModule.withRoutes([])],
    });

    // Create a component fixture and component instance
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  /**
   * Test case: should create
   * It verifies that the DashboardComponent can be created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test case: should retrieve a subset of heroes on ngOnInit
   * It verifies that the `ngOnInit` method retrieves a subset of heroes as expected.
   */
  it('should retrieve a subset of heroes on ngOnInit', () => {
    // Trigger change detection
    fixture.detectChanges();

    // Check if the heroes array contains the expected number of items
    expect(component.heroes.length).toBe(4);
  });
});
