import { Component, Output, EventEmitter } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() readonly filterClicked = new EventEmitter();

  constructor(public filterService: FilterService) {}

  openAdditionalFilters() {
    this.filterClicked.emit();
  }
}
