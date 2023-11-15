import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import { listaCuracionesI } from 'src/app/75Adicionales/Models/3Medico/Curaciones.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curaciones-medico',
  templateUrl: './curaciones-medico.component.html',
  styleUrls: ['./curaciones-medico.component.css']
})
export class CuracionesMedicoComponent implements OnInit {


  curaciones: listaCuracionesI['curaciones'] = [];
  


constructor(private api:ApiService, private router:Router){}




ngOnInit(): void {

 

  this.api.getCuracion().subscribe((response) => {
    if (response && response.curaciones) {
      this.curaciones = response.curaciones;
      console.log(this.curaciones, 'muestra las observaciones semanales');
    }
  });
}

MoreInfo(index: number){

  const curacion = this.curaciones[index]
  

  

  const contenidoHtml = `
    <form >

    <hr class="mx-n3">

      <div class="row">

          <div class="col">
            <mat-label>Fecha de la consulta</mat-label>
          <input type="date" class="form-control" id="fechaRealizada"  value="${curacion.fechaRealizada}" readonly>
          </div>
          <div class="col-3">
          <div class="form-group">
            <label for="generico">Profesional</label>
            <input type="text" id="profesional" class="form-control" value="${curacion.profesional}" readonly>
          </div>  
      </div>
       </div>

  <hr class="mx-n3">

          <div class="row">
            <div class="col">
                <div class="form-group">
                  <label for="Peso">Observaciones</label>
                  <textarea class="form-control" rows="6" id="practicaAplicada"  readonly>${curacion.practicaAplicada}</textarea>
                </div>
            </div>
          </div>

    <hr class="mx-n3">
    </form>
  `;

  Swal.fire({
    title: 'Detalles de la práctica aplicada',
    icon: 'info',
    width: '60%',
    html: contenidoHtml,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
   
  })

}


}