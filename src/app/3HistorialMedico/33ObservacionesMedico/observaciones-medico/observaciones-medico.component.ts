import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { listaSemanalOI } from 'src/app/75Adicionales/Models/3Medico/ObservacionesSemanal.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-observaciones-medico',
  templateUrl: './observaciones-medico.component.html',
  styleUrls: ['./observaciones-medico.component.css']
})
export class ObservacionesMedicoComponent implements OnInit {


  SemanalOb: listaSemanalOI['signosVitales'] = [];


constructor(private api:ApiService, private router:Router){}




ngOnInit(): void {

  this.api.getSemanalO().subscribe((response) => {
    if (response && response.signosVitales) {
      this.SemanalOb = response.signosVitales;
      console.log(this.SemanalOb, 'muestra las observaciones semanales');
    }
  });
}

MoreInfo(index: number){

  const observacion = this.SemanalOb[index]

  
  const residente = this.SemanalOb

  const contenidoHtml = `
    <form >

    <hr class="mx-n3">

      <div class="row">

          <div class="col">
            <mat-label>Fecha de la consulta</mat-label>
          <input type="date" class="form-control" id="fechaConsulta"  value="${observacion.FechaConsulta}" readonly>
          </div>
        
       </div>

  <hr class="mx-n3">

          <div class="row">
              <div class="col-3">
                  <div class="form-group">
                    <label for="generico">Tensión Arterial</label>
                    <input type="text" id="tensionArterial" class="form-control" value="${observacion.TensionArterial}" readonly>
                  </div>  
              </div>
              <div class="col">
                  <div class="form-group">
                    <label for="CantidadTotal">Glucemia</label>
                    <input type="text" id="glucemia" class="form-control" value="${observacion.Glucemia}" readonly>
                  </div>
              </div>
        </div>

    <hr class="mx-n3">

              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="marca">Saturación</label>
                    <input type="text" id="saturacion" class="form-control" value="${observacion.Saturacion}" readonly>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="nombre">Pulso</label>
                    <input type="text" id="pulso" class="form-control" value="${observacion.Pulso}" readonly>
                  </div>
                </div>
              </div>

  <hr class="mx-n3">

              <div class="row">
                  <div class="col">
                      <div class="form-group">
                        <label for="Peso">Observaciones</label>
                        <textarea class="form-control" rows="3" id="observacion"  readonly>${observacion.Observaciones}</textarea>
                      </div>
                  </div>
            </div>

<hr class="mx-n3">

              <div class="row">
                    <div class="col">
                        <div class="form-group">
                          <label for="Medida">Derivaciones</label>
                          <textarea class="form-control" rows="3" id="derivacion"  readonly>${observacion.Derivaciones}</textarea>
                        </div>
                    </div>
              </div>

<hr class="mx-n3">

    </form>
  `;

  Swal.fire({
    title: 'Detalles del Medicamento',
    icon: 'info',
    width: '60%',
    html: contenidoHtml,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
   
  })

}


}