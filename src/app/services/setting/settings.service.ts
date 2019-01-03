import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
ajustes: Ajustes = {
  temaUrl: 'assets/css/colors/default.css',
  tema: 'default'
};
  constructor(@Inject(DOCUMENT) private _document) {
    this.cargar();
  }

  guardar() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }
  cargar() {
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    } else {
    }
    this.aplicarTema(this.ajustes.tema);
  }
  aplicarTema(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('mytheme').setAttribute('href', url);
    this.ajustes.tema = theme;
    this.ajustes.temaUrl = url;
    this.guardar();
  }


}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
