import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import * as translations from '../../ru.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todoist';

  constructor(private config: PrimeNGConfig) {}

  ngOnInit() {
    this.config.setTranslation(translations);
  }
}
