import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VehicleTypesService } from 'src/app/dashboard/services/vehicle-types.service';
import { VehicleType } from 'src/app/models/VehicleType';

@Component({
  selector: 'app-register-vehicle-type',
  templateUrl: './register-vehicle-type.component.html',
  styleUrls: ['./register-vehicle-type.component.scss']
})
export class RegisterVehicleTypeComponent implements OnInit {

  submitted: boolean = false;
  disabled: boolean = false;
  accessDenied: boolean = false;
  loginForm = this.formBuilder.group({
    key: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    rate: ['', [Validators.required]],
  });

  vehicleTypes: VehicleType[] = [];

  constructor(
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
      key: formValues.key,
      title: formValues.title,
      description: formValues.description,
      rate: formValues.rate,
    }
    
    this.vehicleTypesSevice.create(formattedData)
      .subscribe({
        next: () => {
          this.snackBar.open('Tipo de vehículo registrado correctamente.', 'Cerrar', {
            duration: 3000
          });

          this.router.navigate(['/dashboard/tipos-de-vehiculos']);
        },
        error: () => {
          this.snackBar.open('Ocurrio un error al registrar el tipo de vehículo.', 'Cerrar', {
            duration: 3000
          });
        }
      });
  }

  get key() {
    return this.loginForm.get('key');
  }

  get title() {
    return this.loginForm.get('title');
  }

  get description() {
    return this.loginForm.get('description');
  }

  get rate() {
    return this.loginForm.get('rate');
  }

}
