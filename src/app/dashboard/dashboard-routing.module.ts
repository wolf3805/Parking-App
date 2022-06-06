import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth.guard';
import { DashboardLayoutComponent } from './template-parts/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListVehicleStaysComponent } from './components/vehicle-stays/list-vehicle-stays/list-vehicle-stays.component';
import { ListVehiclesComponent } from './components/vehicles/list-vehicles/list-vehicles.component';
import { RegisterVehicleComponent } from './components/vehicles/register-vehicle/register-vehicle.component';
import { ListVehicleTypesComponent } from './components/vehicle-types/list-vehicle-types/list-vehicle-types.component';
import { RegisterVehicleTypeComponent } from './components/vehicle-types/register-vehicle-type/register-vehicle-type.component';
import { VehicleEntranceComponent } from './components/vehicle-stays/vehicle-entrance/vehicle-entrance.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'entrada-salida-de-vehiculos', component: VehicleEntranceComponent },
      { path: 'estancias', component: ListVehicleStaysComponent },
      { path: 'vehiculos', component: ListVehiclesComponent },
      { path: 'vehiculos/registrar', component: RegisterVehicleComponent },
      { path: 'tipos-de-vehiculos', component: ListVehicleTypesComponent },
      { path: 'tipos-de-vehiculos/registrar', component: RegisterVehicleTypeComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
