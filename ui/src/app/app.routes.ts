import { Routes } from '@angular/router';
import { AdComponent } from './ad/ad.component';
import { DetailComponent } from './detail/detail.component';

export const routes: Routes = [
  {path: "", component: AdComponent},
  {path: "ad", component: AdComponent},
  {path: "ad/:ad", component: DetailComponent}
];
