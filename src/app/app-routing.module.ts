import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

/**
 * @author Youri Janssen //entire file
 * Defines the routes for the application.
 */
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to the dashboard on the root path
  { path: 'dashboard', component: DashboardComponent }, // Route to the dashboard component
  { path: 'detail/:id', component: HeroDetailComponent }, // Route to the hero detail component with a parameter
  { path: 'heroes', component: HeroesComponent }, // Route to the heroes component
];

/** The AppRoutingModule configures the application's routes. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
