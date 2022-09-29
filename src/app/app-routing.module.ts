import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { YearY2021Component } from './pages/year-y2021/year-y2021.component';
import { YearY2022Component } from './pages/year-y2022/year-y2022.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '2021', component: YearY2021Component },
  { path: '2022', component: YearY2022Component },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
