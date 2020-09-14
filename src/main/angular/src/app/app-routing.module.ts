import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSpotPageComponent } from './add-spot-page/add-spot-page.component';
import { ShowSpotPageComponent } from './show-spot-page/show-spot-page.component';
import { CreateRoutePageComponent } from './create-route-page/create-route-page.component';
import { ShowRoutePageComponent } from './show-route-page/show-route-page.component';

const routes: Routes = [
  { path: 'show-spot-page', component: ShowSpotPageComponent },
  { path: 'add-spot-page', component: AddSpotPageComponent },
  { path: 'create-route-page', component: CreateRoutePageComponent },
  { path: 'show-route-page', component: ShowRoutePageComponent },
  { path: '', redirectTo: '/show-spot-page', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
