import { Component } from '@angular/core';

/**
 * @author Youri Janssen
 * The root component of the Angular application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /** The title of the application. */
  public title = 'Tour of Heroes';
}
