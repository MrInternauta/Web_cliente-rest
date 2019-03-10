import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame = false;
  auth2: any;
  constructor(public _UsuarioService: UsuarioService,
              public router: Router) { }
  ngOnInit() {
    this.GoogleInt();
    this.email =  localStorage.getItem('email') || '';
    if (this.email.length > 1) {
        this.recuerdame = true;
    }
  }
  GoogleInt() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '803830275778-cb74qlcoid5okpqojo1q73punb26khp2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachsignin(document.getElementById('btnGoogle'));

    });
  }
  attachsignin (element) {
    this.auth2.attachClickHandler(element, {} , (GoogleUser) => {
      const token = GoogleUser.getAuthResponse().id_token;
      const profile = GoogleUser.getBasicProfile();
      this._UsuarioService.LoginGoogle(token)
      .subscribe(() => {
        // this.router.navigate(['/dashboard']);
        window.location.href = '#/quien';
      } );
    } );
  }
  Login( forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(null, null, forma.value.email, forma.value.password);
    this._UsuarioService.Login(usuario, forma.value.recuerdame)
    .subscribe(ok => {
      // this.router.navigate(['/dashboard']);
      window.location.href = '#/quien';
    });
  }

}
