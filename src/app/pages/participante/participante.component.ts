import { Component, OnInit } from '@angular/core';
import { QuienService, UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css']
})
export class ParticipanteComponent implements OnInit {
  participante: any;
  subido =  false;
  imagenTemp: any;
  ImagenSubir: File;
  participantes: any[];
  constructor(private _quien: QuienService,
              public _usuario: UsuarioService) { }

              ngOnInit() {
                this._quien.traerParticipate().subscribe((data: any) => {
                  this.participantes = data;
                });
              }
              borrar(participante ) {
                this._quien.borrarParticipante(participante._id).subscribe((data: any) => {
                  console.log(data);
                  swal(`Participante borrado!`, `La participante ${participante.name} fue borrado.`, 'warning');
                  this.participantes = this.participantes.filter(cate => cate !== participante);
                });
              }
  Guardar( nombre: any, description: any, tipo: any) {
    if (!nombre || !description || !tipo) {
      swal(`Creación erronea!`, `Faltan datos`, 'error');
      return;
    }
    console.log(nombre, description, tipo);
    this._quien.guardarParticipante(nombre, description, tipo).subscribe((data: any) => {
      swal(`Participante  ${nombre} creado!`, `Tipo: ${tipo}. `, 'success');
      this.participante = data;
      this.participantes.push(data);
      console.log(this.participante);
      this.subido = true;
    });
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
    this._quien.CambiarImagen(this.ImagenSubir, this.participante._id );
  }

}
