import { Component, OnInit } from '@angular/core';
import { ValdemortConfig } from 'ngx-valdemort';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todoist';

  constructor(private config: PrimeNGConfig,
              private errorConfig: ValdemortConfig) {
                errorConfig.shouldDisplayErrors = control => control.dirty;
              }

  ngOnInit() {
    this.config.setTranslation(require('../../ru.json').ru);
  }
}
