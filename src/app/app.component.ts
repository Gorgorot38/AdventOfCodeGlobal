import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AdventOfCodeGlobal';

  constructor(private readonly _router: Router) {}

  backHome() {
    this._router.navigate(['home']);
  }
}
