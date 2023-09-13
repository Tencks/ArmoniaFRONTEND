import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import { listaMedicamentosI } from 'src/app/75Adicionales/Models/4Medicamentos/Medicamentos.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-medicamentos',
  templateUrl: './detalles-medicamentos.component.html',
  styleUrls: ['./detalles-medicamentos.component.css']
})
export class DetallesMedicamentosComponent implements OnInit{

  
  
  Medicamentos: listaMedicamentosI['medicamentos'] = [];
  pacientes:listaResidentesI[] =[];


constructor(private api:ApiService, private router:Router,private activaterouter:ActivatedRoute){}

ngOnInit(): void {

  const residenteId = this.activaterouter.snapshot.params['id']; // Obtén el ID del residente desde los parámetros de la URL

  if (residenteId) {
    // Si tienes un ID, establece el pacienteID en tu servicio
    this.api.setPacienteID(residenteId);

    // Realiza la solicitud para obtener los detalles del residente
    this.api.getMedicamentos().subscribe((response) => {
      if (response && response.medicamentos) {
        this.Medicamentos = response.medicamentos;
        console.log(this.Medicamentos, 'medicamentos');
      }
    });
  } else {
    console.log('No se encontró un ID de residente en los parámetros de la URL');
    // Puedes manejar esto según tus necesidades, por ejemplo, redirigir a una página de error
  }
}



  


MoreInfo(index: number){

  const medicamento = this.Medicamentos[index]

  const contenidoHtml = `
    <form>

    <hr class="mx-n3">

    <div class="row">
      <div class="col-3">
        <div class="form-group">
          <label for="generico">Genérico</label>
          <input type="text" id="generico" class="form-control" value="${medicamento.Generico}" readonly>
        </div>  
      </div>
      <div class="col">
        <div class="form-group">
          <label for="CantidadTotal">Cantidad Total</label>
          <input type="text" id="CantidadTotal" class="form-control" value="${medicamento.CantidadTotal}" readonly>
        </div>
      </div>
    </div>

    <hr class="mx-n3">

    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="marca">Marca</label>
          <input type="text" id="marca" class="form-control" value="${medicamento.Marca}" readonly>
        </div>
       </div>
       <div class="col">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" class="form-control" value="${medicamento.Nombre}" readonly>
        </div>
       </div>
    </div>

  <hr class="mx-n3">

  <div class="row">
  <div class="col">
      <div class="form-group">
        <label for="Peso">Peso</label>
        <input type="text" id="peso" class="form-control" value="${medicamento.Peso}" readonly>
      </div>
  </div>
  <div class="col-3">
      <div class="form-group">
        <label for="Medida">Medida</label>
        <input type="text" id="Medida" class="form-control" value="${medicamento.Medida}" readonly>
      </div>
  </div>
</div>

<hr class="mx-n3">

<div class="row">
<div class="col">
      <div class="form-group">
         <label for="FechaInicio">Fecha Inicio</label>
         <input type="text" id="FechaInicio" class="form-control" value="${medicamento.FechaInicio}" readonly>
      </div>
</div>
<div class="col-3">
      <div class="form-group">
          <label for="cantidadDiaria">Consumo Diario</label>
         <input type="text" id="cantidadDiaria" class="form-control" value="${medicamento.cantidadDiaria}" readonly>
      </div>
</div>
</div>

<hr class="mx-n3">
      
      <div class="form-group">
       <label for="Codigo">Codigo</label>
        <input type="text" id="Codigo" class="form-control" value="${medicamento.Codigo}" readonly>
      </div>

      <hr class="mx-n3">

      <div class="form-group">
       <label for="Codigo">Observaciones</label>
       <textarea class="form-control" rows="3" id="observaciones" value="${medicamento.Observaciones}" readonly></textarea>
      </div>

      <hr class="mx-n3">

      <div class="form-group">
       <label for="Codigo">Derivaciones</label>
       <textarea class="form-control" rows="3" id="observaciones" value="${medicamento.Derivaciones}" readonly></textarea>
      </div>

     <hr class="mx-n3">

    </form>
  `;

  Swal.fire({
    title: 'Detalles del Medicamento',
    icon: 'info',
    width: '60%',
    html: contenidoHtml,
    
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:'Aceptar',
    cancelButtonText:'cerrar',
    
  })
//  EN ESTA MISMA ALERTA TENDRÍA QUE ESTAR EL BUTTON PARA ACTUALIZAR LOS DATOS DEL MEDICAMENTO 
// Y TAMBIEN EL BOTON QUE PERMITA ELIMINAR EL MEDICAMENTO 

}



}

