import { Component, OnInit } from '@angular/core';
import { QuienService } from '../../services/quien.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  categorias: any[];
  categoriasEstudiante: any[];
  categoriasDocente: any[];
  hay_cat = true ;
  participantes: any[];
  participantesEstudiante: any[];
  participantesDocente: any[];
  ver = 'd';
  constructor(public _quien: QuienService ) { }

  ngOnInit() {
    this._quien.traerCategoria().subscribe((data: any) => {
      this.categorias = data;
      if (this.categorias.length === 0 ) { this.hay_cat = false; return; }
    this._quien.traerParticipate().subscribe((participantes: any) => {
      this.categoriasDocente = this.categorias.filter(cate => cate.role === 'Docente');
      this.categoriasEstudiante = this.categorias.filter(cate => cate.role === 'Estudiante');
      this.participantes = participantes;
      this.participantesDocente = this.participantes.filter(cate => cate.role === 'Docente');
      this.participantesEstudiante = this.participantes.filter(cate => cate.role === 'Estudiante');
      console.log(this.participantes);
    });
    });
  }

  votar(categoria, participante) {

    if (categoria.role === 'Estudiante') {
      this.categoriasEstudiante = this.categoriasEstudiante.filter(cate => cate !== categoria);
    } else {
      this.categoriasDocente = this.categoriasDocente.filter(cate => cate !== categoria);
    }

    if (this.categoriasDocente.length === 0  && this.categoriasEstudiante.length === 0) { this.hay_cat = false; }
    this._quien.votarParticipante(participante, categoria).subscribe((data: any ) => {
      swal(`Voto correcto!`, `Voto por ${participante.name} para el/la más ${categoria.nombre}!`, 'success');
    });
  }
  selecciona(tipo ) {
    this.ver = tipo;
  }
}
