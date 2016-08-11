import { OnInit, Component } from '@angular/core';

import { Car, CarService } from '../shared/index';

@Component({
    selector: 'data-table',
    templateUrl: 'app/data-table/data-table.component.html',
    styleUrls: [
        'app/data-table/data-table.component.css'
    ]
})
export class DataTableComponent implements OnInit {
    public Cars: Car[];

    constructor (
        private carService: CarService
    ) {
    }

    ngOnInit() {
        this.carService.GetCars().subscribe((data: Car[]) => {
            this.Cars = data
        });
    }
}