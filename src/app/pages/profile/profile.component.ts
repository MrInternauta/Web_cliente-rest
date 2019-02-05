import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: any;
  imagenTemp: string;
  ImagenSubir: File;
  constructor(public _usuario: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usuario.usuario;
  }
  Guardar( f: any) {
    
    this._usuario.usuario.name = f.nombre;
    this._usuario.usuario.lastname = f.apellido;
    this._usuario.ActualizarUsuario( {
      name: f.nombre,
      lastname: f.apellido
    })
    .subscribe(() => {});
  }
  selecionimagen(archivo ) {
    if ( !archivo) {
      this.ImagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0) {
      swal('No es una imagen', 'Solo puedes subir imagenes', 'error');
      this.ImagenSubir = null;
      return;
    }
    this.ImagenSubir = archivo;
    const reader = new FileReader();
    const UrlImgTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
    console.log(archivo);
  }
  cambiarimagen() {
    this._usuario.CambiarImagen(this.ImagenSubir, this._usuario.usuario._id );
  }

}
