import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleTypesService } from 'src/app/dashboard/services/vehicle-types.service';

import { VehicleType } from 'src/app/models/VehicleType';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list-vehicle-types',
  templateUrl: './list-vehicle-types.component.html',
  styleUrls: ['./list-vehicle-types.component.scss']
})
export class ListVehicleTypesComponent implements OnInit {

  filters: object = {};
  isLoading: boolean = false;
  pageSizeOptions: number[] = [
    10,
    25,
    100
  ];
  displayedColumns: string[] = [
    'id',
    'key',
    'title',
    'description',
    'rate',
    'createdAt',
    'updatedAt',
    'options',
  ];

  dataSource: MatTableDataSource<VehicleType> = new MatTableDataSource<VehicleType>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private vehicleTypeService: VehicleTypesService,
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

    this.vehicleTypeService.getAll(params)
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<VehicleType>(response.data.vehicle_types);
        this.paginator.pageIndex = response.data.meta.current_page - 1;
        this.paginator.length = response.data.meta.total;
        this.isLoading = false;
      })
  }

  delete(id: number) {
    this.isLoading = true;

    this.vehicleTypeService.delete(id)
      .subscribe({
        next: () => {
          this.snackBar.open('Tipo de vehículo eliminado correctamente.', 'Cerrar', {
            duration: 3000
          });
        },
        error: () => {
          this.snackBar.open('Ocurrio un error al eliminar el tipo de vehículo.', 'Cerrar', {
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
