import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HeroService } from 'src/app/services/hero.service';
import { of } from 'rxjs';
import { Hero } from 'src/app/interfaces/hero';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  const heroesData: Hero[] = [
    { id: 1, name: 'Hero 1' },
    { id: 2, name: 'Hero 2' },
    { id: 3, name: 'Hero 3' },
    { id: 4, name: 'Hero 4' },
    { id: 5, name: 'Hero 5' },
  ];

  beforeEach(() => {
    // Create a spy object for HeroService
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    mockHeroService.getHeroes.and.returnValue(of(heroesData));

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      imports: [RouterModule, RouterTestingModule.withRoutes([])],
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve a subset of heroes on ngOnInit', () => {
    fixture.detectChanges();

    expect(component.heroes.length).toBe(4);
  });
});
