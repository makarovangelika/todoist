import { Component, Input } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() openAdditionalFilters: () => void = () => {}

  constructor(public filterService: FilterService) {}

}
