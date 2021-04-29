import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTourismPageComponent } from 'src/app/add-spot-page/add-tourism-page/add-tourism-page.component';
import { AddRestaurantPageComponent } from './add-spot-page/add-restaurant-page/add-restaurant-page.component';
import { AddHotelPageComponent } from './add-spot-page/add-hotel-page/add-hotel-page.component';
import { AddActivityPageComponent } from './add-spot-page/add-activity-page/add-activity-page.component';
import { CreateRoutePageComponent } from './create-route-page/create-route-page.component';
import { ShowContainerPageComponent } from './show-container-page/show-container-page.component';

const routes: Routes = [
  { path: 'show-container-page', component: ShowContainerPageComponent },
  { path: 'add-tourism-page', component: AddTourismPageComponent },
  { path: 'add-restaurant-page', component: AddRestaurantPageComponent },
  { path: 'add-hotel-page', component: AddHotelPageComponent },
  { path: 'add-activity-page', component: AddActivityPageComponent },
  { path: 'create-route-page', component: CreateRoutePageComponent },
  { path: '', redirectTo: '/show-container-page', pathMatch: 'full' },
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
