import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from '../services/usuario/usuario.service';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  constructor (private _Usuario: UsuarioService ) {

  }

  transform(img: string , tipo: string = 'usuario'): any {
    // {{url}}/imagen/usuarios/5c1ed49dc6064320e4c59615-198.jpg?token={{token}}
    let url = environment.url + '/imagen/';
    if ( !img ) {
      return url + `usuarios/xxx?token=${this._Usuario.token}`;
    }
    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch ( tipo ) {
      case 'usuario':
      url += `usuarios/${ img }?token=${this._Usuario.token}`;
      break;
      case 'participante':
      url += `participante/${ img }?token=${this._Usuario.token}`;
      break;
      default:
      console.log('Tipo de imagen no existe');
      return url + `usuarios/xxx?token=${this._Usuario.token}`;
    }
    return url;
  }

}
