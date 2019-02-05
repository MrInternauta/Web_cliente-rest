import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  constructor(public _UserService: UsuarioService,
              public router: Router) { }
  SonIguales (camp: string, camp2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[camp].value;
      const pass2 = group.controls[camp2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
        SonIguales: true
      };
    };
  }
  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      termino: new FormControl(false),
    }, {validators: this.SonIguales('password', 'password2') }
    );
    this.forma.setValue({
      name: 'Felipe',
      lastname: 'Ramirez',
      email: 'email@email.com',
      password: '123456',
      password2: '123456',
      termino: true,
    });
  }
  RegistrarUsuario () {
      if (this.forma.invalid) {
        swal('Error!', 'Algun dato es erróneo!', 'warning');
        return;
      }
      if (!this.forma.value.termino ) {
        swal('Importante!', 'Debe aceptar las condiciones!', 'warning');

        console.log('Debe aceptar los terminos');
        return;
      }
      const usuario = new Usuario(
        this.forma.value.name,
        this.forma.value.lastname,
        this.forma.value.email,
        this.forma.value.password
      );
      this._UserService.RegistrarUsuario(usuario)
        .subscribe(
          (resp: any) => {
            console.log(resp);
            this.router.navigate(['/login']);
          },
          (error) => {
            console.log(error);
          }  );
      console.log(this.forma.value);
  }

}
