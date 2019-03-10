import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor (public _UsuarioService: UsuarioService,
    public router: Router) {}
    canActivate() {
      if (this._UsuarioService.EstaLogueado() && this._UsuarioService.usuario.role === 'ADMIN_ROLE') {
        return true;
      } else {
        this.router.navigate(['/quien']);
        return false;
      }
    }
}
