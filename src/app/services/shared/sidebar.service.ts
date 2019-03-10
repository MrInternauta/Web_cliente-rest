import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Quien es más',
      icono: 'mdi mdi-account-check',
      subMenu: [
        {titulo: 'Quien es más', url: '/quien'},
        {titulo: 'Resultados', url: '/graficas1'}
      ]
    }
  ];

  constructor(private _user: UsuarioService) {
    if ( this._user.usuario.role === 'ADMIN_ROLE') {
      this.menu = [
        {
          titulo: 'Quien es más',
          icono: 'mdi mdi-account-check',
          subMenu: [
            {titulo: 'Quien es más', url: '/quien'},
            {titulo: 'Resultados', url: '/graficas1'},
            {titulo: 'Participantes', url: '/participante'},
            {titulo: 'Categorias', url: '/categoria'}
          ]
        }
      ];
    }
   }
}
