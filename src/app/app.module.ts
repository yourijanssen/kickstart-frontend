import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

/**
 * @author Youri Janssen //entire file
 * The root AppModule for configuring the Angular application.
 */
@NgModule({
  /**
   * The declarations array lists the components that belong to this module.
   * These components are available for use within the AppModule.
   */
  declarations: [AppComponent, HeroesComponent, HeroDetailComponent, DashboardComponent],
  /**
   * The imports array specifies the modules that this module depends on.
   * BrowserModule is required for running the application in a web browser.
   * AppRoutingModule provides the application's routing configuration.
   * FormsModule is necessary for working with forms in the application and enabling its functionalities.
   */
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  /** Providers array is where you would include service providers if needed. */
  providers: [],
  /**
   * Bootstrap property specifies the root component of the application.
   * The root component is the starting point of the application's component tree.
   */
  bootstrap: [AppComponent],
})
export class AppModule {}
