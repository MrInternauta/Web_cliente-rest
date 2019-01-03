import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input() porcentaje = 50;
  // tslint:disable-next-line:no-input-rename
  @Input('nombre') leyenda = 'leyenda';
  // tslint:disable-next-line:no-output-rename
  @Output('SalidaValorDesdeincrementador') cambioValor: EventEmitter<number> =  new EventEmitter();
  constructor() {
  }

  ngOnInit() {
    console.log(this.leyenda, this.porcentaje);
  }
  OnChange($event: number) {
    console.log(this.txtProgress.nativeElement.value);
    if ($event >=100) {
      this.porcentaje = 100;
    }
    else if ($event <= 0 ) {
      this.porcentaje = 0;
    }
    else {
      this.porcentaje = $event;
    }
    this.txtProgress.nativeElement.value = Number(this.porcentaje);
    this.cambioValor.emit(this.porcentaje);
  }
  cambiar(valor) {
    this.porcentaje = this.porcentaje +  valor;
    if (this.porcentaje >= 100) {
      this.porcentaje = 100;
      console.log(this.porcentaje);
      return;
    }
    if (this.porcentaje <= 0 ) {
      this.porcentaje = 0;
      console.log(this.porcentaje);
      return;
    }
    this.cambioValor.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus();
  }

}
