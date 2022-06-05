import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Vehicle } from 'src/app/models/Vehicle';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.scss']
})
export class ListVehiclesComponent implements OnInit {

  filters: object = {};
  isLoading: boolean = false;
  pageSizeOptions: number[] = [
    10,
    25,
    100
  ];
  displayedColumns: string[] = [
    'id',
    'vehicleTypeId',
    'plateNumber',
    'createdAt',
    'updatedAt',
    'updatedAt',
    'options',
  ];

  dataSource: MatTableDataSource<Vehicle> = new MatTableDataSource<Vehicle>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private vehicleService: VehiclesService) { }

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
        this.dataSource = new MatTableDataSource<Vehicle>(response.data.vehicles);
        this.paginator.pageIndex = response.data.meta.current_page - 1;
        this.paginator.length = response.data.meta.total;
        this.isLoading = false;
      })
  }

}