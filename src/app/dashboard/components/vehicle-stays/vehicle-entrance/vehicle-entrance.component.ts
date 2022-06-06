import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, filter, ReplaySubject } from 'rxjs';

import { Vehicle } from 'src/app/models/Vehicle';
import { VehicleStay } from 'src/app/models/VehicleStay';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { VehicleStaysService } from '../../../services/vehicle-stays.service';
import { ConfirmCheckoutDialogComponent } from '../../dialogs/confirm-checkout-dialog/confirm-checkout-dialog.component';

@Component({
  selector: 'app-vehicle-entrance',
  templateUrl: './vehicle-entrance.component.html',
  styleUrls: ['./vehicle-entrance.component.scss']
})
export class VehicleEntranceComponent implements OnInit {

  protected filters: object = {};
  protected isLoading: boolean = false;
  protected disabled: boolean = false;
  protected searching: boolean = false;
  protected vehicles: Vehicle[] = [];
  protected inputFilter: UntypedFormControl = new UntypedFormControl();
  protected filteredVehicles: ReplaySubject<Vehicle[]> = new ReplaySubject<Vehicle[]>(1);
  protected dataSource: MatTableDataSource<VehicleStay> = new MatTableDataSource<VehicleStay>([]);
  protected loginForm = this.formBuilder.group({
    vehicleId: ['', [Validators.required]],
  });
  protected pageSizeOptions: number[] = [
    10,
    25,
    100
  ];
  protected displayedColumns: string[] = [
    'id',
    'vehicleId',
    'checkIn',
    'options',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private vehicleStaysService: VehicleStaysService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private vehiclesSevice: VehiclesService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadData()

    this.vehiclesSevice.getAll()
      .subscribe((response) => {
        this.filteredVehicles.next(response.data.vehicles)
      })

    this.inputFilter.valueChanges
      .pipe(
        filter(search => !!search),
        debounceTime(200),
      )
      .subscribe(filter => {
        this.searching = true;
        this.vehiclesSevice.getAll({ q: filter })
          .subscribe((response) => {
            this.filteredVehicles.next(response.data.vehicles)
            this.searching = false;
          })
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filters = {...this.filters, ...{
      q: filterValue.trim().toLowerCase(),
      page: 1,
    }}

    this.loadData(this.filters)
  }

  pageChanged(event: PageEvent) {
    this.filters = {
      ...this.filters, ...{
      page: event.pageIndex  + 1, 
      per_page: event.pageSize,
    }}

    this.loadData(this.filters);
  }

  loadData(params: object = {}) {
    this.isLoading = true;

    this.vehicleStaysService.getAll({ ...params, ...{ check_out: 'isNull' }})
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<VehicleStay>(response.data.vehicle_stays);
        this.paginator.pageIndex = response.data.meta.current_page - 1;
        this.paginator.length = response.data.meta.total;
        this.isLoading = false;
      })
  }

  checkout(id: number) {
    this.isLoading = true;

    this.vehicleStaysService.update(id, {check_out: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm", 'en-US')})
      .subscribe({
        next: () => {
          this.snackBar.open('Vehículo eliminado correctamente.', 'Cerrar', {
            duration: 3000
          });
        },
        error: () => {
          this.snackBar.open('Ocurrio un error al eliminar el vehículo.', 'Cerrar', {
            duration: 3000
          });
        }
      });
  }

  openCheckOutDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmCheckoutDialogComponent);

    dialogRef
      .afterClosed()
      .subscribe((confirmation: Boolean) => {
        if (confirmation) {
          this.checkout(id)

          this.loadData()
        }
      });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.disabled = true;

    const formValues = this.loginForm.value;
    const formattedData = {
      vehicle_id: formValues.vehicleId,
    }
    
    this.vehicleStaysService.create(formattedData)
      .subscribe({
        next: () => {
          this.snackBar.open('Entrada de vehículo registrada correctamente.', 'Cerrar', {
            duration: 3000
          });

          this.loadData();
        },
        error: () => {
          this.snackBar.open('Ocurrio un error al registrar la entrada de vehículo.', 'Cerrar', {
            duration: 3000
          });
        }
      });
  }

  get vehicleId() {
    return this.loginForm.get('vehicleId');
  }
}
