import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { YearY2021Component } from './pages/year-y2021/year-y2021.component';
import { DayComponent } from './components/day/day.component';
import { HttpClientModule } from '@angular/common/http';
import { DayY2021D01Component } from './components/day-y2021-d01/day-y2021-d01.component';
import { DayY2021D02Component } from './components/day-y2021-d02/day-y2021-d02.component';
import { DayY2021D03Component } from './components/day-y2021-d03/day-y2021-d03.component';
import { DayY2021D04Component } from './components/day-y2021-d04/day-y2021-d04.component';
import { DayY2021D05Component } from './components/day-y2021-d05/day-y2021-d05.component';
import { DayY2021D06Component } from './components/day-y2021-d06/day-y2021-d06.component';
import { DayY2021D07Component } from './components/day-y2021-d07/day-y2021-d07.component';
import { DayY2021D08Component } from './components/day-y2021-d08/day-y2021-d08.component';
import { DayY2021D09Component } from './components/day-y2021-d09/day-y2021-d09.component';
import { DayY2021D10Component } from './components/day-y2021-d10/day-y2021-d10.component';
import { DayY2021D11Component } from './components/day-y2021-d11/day-y2021-d11.component';
import { DayY2021D12Component } from './components/day-y2021-d12/day-y2021-d12.component';
import { DayY2021D13Component } from './components/day-y2021-d13/day-y2021-d13.component';
import { DayY2021D14Component } from './components/day-y2021-d14/day-y2021-d14.component';
import { DayY2021D15Component } from './components/day-y2021-d15/day-y2021-d15.component';
import { DayY2021D16Component } from './components/day-y2021-d16/day-y2021-d16.component';
import { DayY2021D17Component } from './components/day-y2021-d17/day-y2021-d17.component';
import { DayY2021D18Component } from './components/day-y2021-d18/day-y2021-d18.component';
import { DayY2021D19Component } from './components/day-y2021-d19/day-y2021-d19.component';
import { DayY2021D20Component } from './components/day-y2021-d20/day-y2021-d20.component';
import { DayY2021D21Component } from './components/day-y2021-d21/day-y2021-d21.component';
import { DayY2021D22Component } from './components/day-y2021-d22/day-y2021-d22.component';
import { DayY2021D23Component } from './components/day-y2021-d23/day-y2021-d23.component';
import { DayY2021D24Component } from './components/day-y2021-d24/day-y2021-d24.component';
import { DayY2021D25Component } from './components/day-y2021-d25/day-y2021-d25.component';
import { DayY2022D01Component } from './components/day-y2022-d01/day-y2022-d01.component';
import { DayY2022D02Component } from './components/day-y2022-d02/day-y2022-d02.component';
import { DayY2022D03Component } from './components/day-y2022-d03/day-y2022-d03.component';
import { DayY2022D04Component } from './components/day-y2022-d04/day-y2022-d04.component';
import { DayY2022D05Component } from './components/day-y2022-d05/day-y2022-d05.component';
import { DayY2022D06Component } from './components/day-y2022-d06/day-y2022-d06.component';
import { DayY2022D07Component } from './components/day-y2022-d07/day-y2022-d07.component';
import { DayY2022D08Component } from './components/day-y2022-d08/day-y2022-d08.component';
import { DayY2022D09Component } from './components/day-y2022-d09/day-y2022-d09.component';
import { DayY2022D10Component } from './components/day-y2022-d10/day-y2022-d10.component';
import { DayY2022D11Component } from './components/day-y2022-d11/day-y2022-d11.component';
import { DayY2022D12Component } from './components/day-y2022-d12/day-y2022-d12.component';
import { DayY2022D13Component } from './components/day-y2022-d13/day-y2022-d13.component';
import { DayY2022D14Component } from './components/day-y2022-d14/day-y2022-d14.component';
import { DayY2022D15Component } from './components/day-y2022-d15/day-y2022-d15.component';
import { DayY2022D16Component } from './components/day-y2022-d16/day-y2022-d16.component';
import { DayY2022D17Component } from './components/day-y2022-d17/day-y2022-d17.component';
import { DayY2022D18Component } from './components/day-y2022-d18/day-y2022-d18.component';
import { DayY2022D19Component } from './components/day-y2022-d19/day-y2022-d19.component';
import { DayY2022D20Component } from './components/day-y2022-d20/day-y2022-d20.component';
import { DayY2022D21Component } from './components/day-y2022-d21/day-y2022-d21.component';
import { DayY2022D22Component } from './components/day-y2022-d22/day-y2022-d22.component';
import { DayY2022D23Component } from './components/day-y2022-d23/day-y2022-d23.component';
import { DayY2022D24Component } from './components/day-y2022-d24/day-y2022-d24.component';
import { DayY2022D25Component } from './components/day-y2022-d25/day-y2022-d25.component';
import { YearY2022Component } from './pages/year-y2022/year-y2022.component';
import { YearY2023Component } from './pages/year-y2023/year-y2023.component';
import { DayY2023D01Component } from './components/day-y2023-d01/day-y2023-d01.component';

const matModules = [MatSelectModule, MatButtonModule, MatExpansionModule, MatInputModule];
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    YearY2021Component,
    DayComponent,
    DayY2021D01Component,
    DayY2021D02Component,
    DayY2021D03Component,
    DayY2021D04Component,
    DayY2021D05Component,
    DayY2021D06Component,
    DayY2021D07Component,
    DayY2021D08Component,
    DayY2021D09Component,
    DayY2021D10Component,
    DayY2021D11Component,
    DayY2021D12Component,
    DayY2021D13Component,
    DayY2021D14Component,
    DayY2021D15Component,
    DayY2021D16Component,
    DayY2021D17Component,
    DayY2021D18Component,
    DayY2021D19Component,
    DayY2021D20Component,
    DayY2021D21Component,
    DayY2021D22Component,
    DayY2021D23Component,
    DayY2021D24Component,
    DayY2021D25Component,
    DayY2022D01Component,
    DayY2022D02Component,
    DayY2022D03Component,
    DayY2022D04Component,
    DayY2022D05Component,
    DayY2022D06Component,
    DayY2022D07Component,
    DayY2022D08Component,
    DayY2022D09Component,
    DayY2022D10Component,
    DayY2022D11Component,
    DayY2022D12Component,
    DayY2022D13Component,
    DayY2022D14Component,
    DayY2022D15Component,
    DayY2022D16Component,
    DayY2022D17Component,
    DayY2022D18Component,
    DayY2022D19Component,
    DayY2022D20Component,
    DayY2022D21Component,
    DayY2022D22Component,
    DayY2022D23Component,
    DayY2022D24Component,
    DayY2022D25Component,
    YearY2022Component,
    YearY2023Component,
    DayY2023D01Component,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ReactiveFormsModule, [...matModules], HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [[...matModules]],
})
export class AppModule {}
