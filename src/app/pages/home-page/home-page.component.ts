import { Component } from '@angular/core'
import { MatSelectChange } from '@angular/material/select'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  years = ['2021', '2022']

  constructor(private readonly _router: Router) {}

  navigate(event: MatSelectChange) {
    this._router.navigate([event.value])
  }
}
