import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { VehicleStay } from 'src/app/models/VehicleStay';
import { VehicleStaysService } from '../../../services/vehicle-stays.service';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list-vehicle-stays',
  templateUrl: './list-vehicle-stays.component.html',
  styleUrls: ['./list-vehicle-stays.component.scss']
})
export class ListVehicleStaysComponent implements OnInit {

  filters: object = {};
  isLoading: boolean = false;
  pageSizeOptions: number[] = [
    10,
    25,
    100
  ];
  displayedColumns: string[] = [
    'id',
    'vehicleId',
    'checkIn',
    'checkOut',
    'createdAt',
    'updatedAt',
  ];

  dataSource: MatTableDataSource<VehicleStay> = new MatTableDataSource<VehicleStay>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private vehicleService: VehicleStaysService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData()
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
    this.filters = {...this.filters, ...{
      page: event.pageIndex  + 1, 
      per_page: event.pageSize,
    }}

    this.loadData(this.filters);
  }

  loadData(params: object = {}) {
    this.isLoading = true;

    this.vehicleService.getAll(params)
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<VehicleStay>(response.data.vehicle_stays);
        this.paginator.pageIndex = response.data.meta.current_page - 1;
        this.paginator.length = response.data.meta.total;
        this.isLoading = false;
      })
  }

  delete(id: number) {
    this.isLoading = true;

    this.vehicleService.delete(id)
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

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef
      .afterClosed()
      .subscribe((confirmation: Boolean) => {
        if (confirmation) {
          this.delete(id)

          this.loadData()
        }
      });
  }

}
