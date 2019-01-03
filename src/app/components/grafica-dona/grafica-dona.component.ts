import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('data') Data: any;
  public doughnutChartLabels: any;
  public doughnutChartData: any;
  public doughnutChartType: any;
  constructor() { }

  ngOnInit() {
  }

}
