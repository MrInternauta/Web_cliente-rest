import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  porcentaje = 50;
  porcentaje2 = 20;
  constructor() { }

  ngOnInit() {
  }



}
