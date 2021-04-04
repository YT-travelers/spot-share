import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTourismPageComponent } from './add-tourism-page/add-tourism-page.component';
import { CreateRoutePageComponent } from './create-route-page/create-route-page.component';
import { ShowContainerPageComponent } from './show-container-page/show-container-page.component';

const routes: Routes = [
  { path: 'show-container-page', component: ShowContainerPageComponent },
  { path: 'add-tourism-page', component: AddTourismPageComponent },
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
