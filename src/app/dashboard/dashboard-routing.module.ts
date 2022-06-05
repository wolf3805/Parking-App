import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth.guard';
import { DashboardLayoutComponent } from './template-parts/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VehicleStaysComponent } from './components/vehicle-stays/vehicle-stays.component';
import { VehicleTypesComponent } from './components/vehicle-types/vehicle-types.component';
import { ListVehiclesComponent } from './components/vehicles/list-vehicles/list-vehicles.component';
import { RegisterVehicleComponent } from './components/vehicles/register-vehicle/register-vehicle.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'estancias', component: VehicleStaysComponent },
      { path: 'vehiculos', component: ListVehiclesComponent },
      { path: 'vehiculos/registrar', component: RegisterVehicleComponent },
      { path: 'vehiculos/tipos', component: VehicleTypesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
