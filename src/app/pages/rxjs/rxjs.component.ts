import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  suscriptio: Subscription

  constructor() {

    this.suscriptio = this.ObsFunction()
    /*.pipe(
      retry(2)
    )*/
    .subscribe(
      (data) => console.log('sub', data),
      (e) => console.log('error', e),
      () => console.log('Termino')
    );

   }
  ngOnInit() {
  }
  ngOnDestroy() {
    console.log('Se va a cerrar');
    this.suscriptio.unsubscribe();
  }

  ObsFunction(): Observable <any> {
    return new Observable(observer => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;
        const salida  =  {
          valor : contador
        };
          observer.next( salida );
          /*if ( contador ===  3) {
            clearInterval(intervalo);
            observer.complete();
          }
          if ( contador === 2 ) {
            // clearInterval(intervalo);
            observer.error('Auxilio!');
          }*/
      }, 1000);
    }).pipe(
      map( (val: any) => val.valor ),
      filter( (valor, index) => {
        if ( valor % 2 === 0) {
          return true;
        }
        if ( valor % 2 === 1) {
          return false;
        }
      })
    );
  }

}
