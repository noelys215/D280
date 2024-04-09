import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
  /* Redirect the empty path to '/map' */
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  /* The MapComponent at the '/map' path */
  { path: 'map', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
