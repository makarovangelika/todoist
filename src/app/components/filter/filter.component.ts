import { Component, Input, WritableSignal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FilterService } from 'src/app/services/filter.service';
import { AdditionalFiltersComponent } from '../additional-filters/additional-filters.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  ref: DynamicDialogRef | undefined;

  constructor(public filterService: FilterService,
              private dialogService: DialogService) {}

  openAdditionalFilters() {
    this.ref = this.dialogService.open(AdditionalFiltersComponent, {
      dismissableMask: true,
      modal: true,
      keepInViewport: true,
      header: "Фильтры"
    })
  }
}
