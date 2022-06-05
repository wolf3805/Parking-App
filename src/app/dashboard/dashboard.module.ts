import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './template-parts/header/header.component';
import { LeftSidebarComponent } from './template-parts/left-sidebar/left-sidebar.component';
import { DashboardLayoutComponent } from './template-parts/dashboard-layout/dashboard-layout.component';
import { ListVehiclesComponent } from './components/vehicles/list-vehicles/list-vehicles.component';
import { VehicleStaysComponent } from './components/vehicle-stays/vehicle-stays.component';
import { RegisterVehicleComponent } from './components/vehicles/register-vehicle/register-vehicle.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { ListVehicleTypesComponent } from './components/vehicle-types/list-vehicle-types/list-vehicle-types.component';
import { RegisterVehicleTypeComponent } from './components/vehicle-types/register-vehicle-type/register-vehicle-type.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardLayoutComponent,
    HeaderComponent,
    LeftSidebarComponent,
    ListVehiclesComponent,
    VehicleStaysComponent,
    RegisterVehicleComponent,
    DeleteDialogComponent,
    ListVehicleTypesComponent,
    RegisterVehicleTypeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
