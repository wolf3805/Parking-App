import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { VehiclesService } from 'src/app/services/vehicles.service';
import { VehicleTypesService } from 'src/app/dashboard/services/vehicle-types.service';
import { VehicleType } from 'src/app/models/VehicleType';

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.scss']
})
export class RegisterVehicleComponent implements OnInit {

  submitted: boolean = false;
  disabled: boolean = false;
  accessDenied: boolean = false;
  loginForm = this.formBuilder.group({
    plateNumber: ['', [Validators.required]],
    vehicleTypeId: ['', [Validators.required]],
  });

  vehicleTypes: VehicleType[] = [];

  constructor(
    private vehicleService: VehiclesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private vehicleTypesSevice: VehicleTypesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.vehicleTypesSevice.getAll()
      .subscribe((response) => {
        this.vehicleTypes = response.data.vehicle_types;
      })
  }

  onSubmit(): void {
    this.accessDenied = false;
    this.submitted = true;

    if (!this.loginForm.valid) {
      return;
    }

    this.disabled = true;

    const formValues = this.loginForm.value;
    const formattedData = {
      plate_number: formValues.plateNumber,
      vehicle_type_id: formValues.vehicleTypeId,
    }
    
    this.vehicleService.create(formattedData)
      .subscribe({
        next: () => {
          this.snackBar.open('Vehículo registrado correctamente.', 'Cerrar', {
            duration: 3000
          });

          this.router.navigate(['dashboard/vehiculos']);
        },
        error: () => {
          this.snackBar.open('Ocurrio un error al registrar el vehículo.', 'Cerrar', {
            duration: 3000
          });
        }
      });
  }

  get plateNumber() {
    return this.loginForm.get('plateNumber');
  }

  get vehicleTypeId() {
    return this.loginForm.get('vehicleTypeId');
  }
  
}
