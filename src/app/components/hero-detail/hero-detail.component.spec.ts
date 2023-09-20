/**
 * Import necessary dependencies for testing the HeroDetailComponent.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

// Import the component, service, and interface to be tested.
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from 'src/app/interfaces/hero';

/**
 * Describe a test suite for the HeroDetailComponent.
 */
describe('HeroDetailComponent test suite', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockActivatedRoute: any;
  let mockLocation: any;

  // Sample hero data for testing.
  const heroData: Hero = { id: 1, name: 'Test Hero' };

  /**
   * Configure the testing environment before each test case.
   */
  beforeEach(() => {
    // Create a spy object for HeroService.
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroById', 'updateHeroNameById']);
    mockHeroService.getHeroById.and.returnValue(of(heroData));
    mockHeroService.updateHeroNameById.and.returnValue(of(undefined));

    // Create a mock ActivatedRoute with a snapshot.
    mockActivatedRoute = { snapshot: { paramMap: { get: () => '1' } } };

    // Create a mock Location object.
    mockLocation = { back: () => {} };

    // Configure the TestBed with necessary providers and imports.
    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation },
      ],
      imports: [FormsModule],
    });

    // Create a ComponentFixture and component instance for testing.
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
  });

  /**
   * Test case: Ensure that the component is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test case: Verify that hero details are retrieved when ngOnInit is called.
   */
  it('should retrieve hero details on ngOnInit', () => {
    fixture.detectChanges();

    expect(component.hero).toEqual(heroData);
  });

  /**
   * Test case: Verify that the goBack function navigates back as expected.
   */
  it('should navigate back when goBack is called', () => {
    const locationBackSpy = spyOn(mockLocation, 'back');

    component.goBack();

    expect(locationBackSpy).toHaveBeenCalledOnceWith();
  });

  /**
   * Test case: Verify that hero name is updated correctly when updateHeroName is called.
   */
  it('should update hero name when updateHeroName is called', () => {
    const newName = 'New Hero Name';
    component.hero = heroData;
    component.newHeroName = newName;

    component.updateHeroName();

    expect(mockHeroService.updateHeroNameById).toHaveBeenCalledWith(heroData.id, newName);
    expect(component.hero?.name).toEqual(newName);
  });

  /**
   * Test case: Verify that hero name is not updated when updateHeroName is called with an empty name.
   */
  it('should not update hero name when updateHeroName is called with empty name', () => {
    component.hero = heroData;
    component.newHeroName = '';

    component.updateHeroName();

    expect(mockHeroService.updateHeroNameById).not.toHaveBeenCalled();
    expect(component.hero?.name).toEqual(heroData.name);
  });
});
