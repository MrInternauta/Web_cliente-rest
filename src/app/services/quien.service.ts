import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SubirarhivoService } from './subirarchivo/subirarhivo.service';

@Injectable({
  providedIn: 'root'
})
export class QuienService {
  usuario: any;
  token: string;
  constructor(public router: Router, public http: HttpClient, public subirarchivo: SubirarhivoService) {
    this.CargarStorage();
   }

   CargarStorage () {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }
  traerCategoriaTodas () {

    const headers = new HttpHeaders({
      'token': this.token
    });

    return this.http.get(environment.url + '/categoria/listar/', {
      headers
    })
      .pipe(
        map( (data: any) => {
          return data.categorias;
        } )
      );
   }
  traerCategoria () {

    const headers = new HttpHeaders({
      'token': this.token
    });

    return this.http.get(environment.url + '/categoria/listar/' + this.usuario._id, {
      headers
    })
      .pipe(
        map( (data: any) => {
          return data.categorias;
        } )
      );
   }
   traerParticipate () {

    const headers = new HttpHeaders({
      'token': this.token
    });

    return this.http.get(environment.url + '/participante/listar', {
      headers
    })
      .pipe(
        map( (data: any) => {
          return data.usuarios;
        } )
      );
   }

   votarParticipante ( participante, categoria) {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this.http.post(environment.url + '/voto/crear', {
      participante,
      categoria,
      votador: this.usuario._id
    }, {
      headers
    })
    .pipe(
      map( (data: any) => {
        return data.voto;
      } )
    );
   }

    guardarCategoria ( nombre, description, tipo) {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this.http.post(environment.url + '/categoria/crear', {
      nombre,
      description,
      role: tipo
    }, {
      headers
    })
    .pipe(
      map( (data: any) => {
        return data.categoria;
      } )
    );
   }
   borrarCategoria ( id) {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this.http.delete(environment.url + '/categoria/borrar/' + id, {
      headers
    })
    .pipe(
      map( (data: any) => {
        return data;
      } )
    );
   }
   borrarParticipante ( id) {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this.http.delete(environment.url + '/participante/borrar/' + id, {
      headers
    })
    .pipe(
      map( (data: any) => {
        return data.participante;
      } )
    );
   }
   guardarParticipante ( nombre, description, tipo) {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this.http.post(environment.url + '/participante/crear', {
      nombre,
      description,
      role: tipo
    }, {
      headers
    })
    .pipe(
      map( (data: any) => {
        return data.usuario;
      } )
    );
   }
   CambiarImagen(file: File, id: string) {
    this.subirarchivo.SubirArchivo(file, 'participante', id)
    .then( (res: any) => {
      console.log(res);
      swal(`Imagen actualizada!`, `Actualizado correctamente!`, 'success');
    }).catch( e => {
      console.log(e);
    });
  }
}
