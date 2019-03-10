import { Component, OnInit } from '@angular/core';
import { QuienService } from 'src/app/services/service.index';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  nombre = '';
  description = '';
  tipo = '';
  categoria: any;
  categorias: any[];
  constructor(private _quien: QuienService) { }
  ngOnInit() {
    this._quien.traerCategoriaTodas().subscribe((data: any) => {
      this.categorias = data;
    });
  }
  borrar(categoria ) {
    this._quien.borrarCategoria(categoria._id).subscribe((data: any) => {
      console.log(data);
      swal(`Categoria borrada!`, `La categoria ${categoria.nombre} fue borrada.`, 'warning');
      this.categorias = this.categorias.filter(cate => cate !== categoria);
    });
  }
  Guardar( nombre: any, description: any, tipo: any) {
    if (!nombre || !description || !tipo) {
      swal(`Creación erronea!`, `Faltan datos`, 'error');
      return;
    }
    this._quien.guardarCategoria(nombre, description, tipo).subscribe((data: any) => {
      swal(`Categoria  ${nombre} creada!`, `Tipo: ${tipo}. \nDescripcion: ${description}`, 'success');
      console.log(data);
    });
  }

}
