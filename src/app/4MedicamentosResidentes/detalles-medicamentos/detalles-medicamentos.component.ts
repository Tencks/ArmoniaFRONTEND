import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionesServiceService } from 'src/app/75Adicionales/751Service/752NotificacionesService/notificaciones-service.service';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { DetallesPacienteI, listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import { LoadMedicamentoI, listaDeleteMedicamentosI, listaMedicamentosI } from 'src/app/75Adicionales/Models/4Medicamentos/Medicamentos.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-medicamentos',
  templateUrl: './detalles-medicamentos.component.html',
  styleUrls: ['./detalles-medicamentos.component.css']
})
export class DetallesMedicamentosComponent implements OnInit{

  
  
  Medicamentos: listaMedicamentosI['medicamentos'] = [];
  pacientes:DetallesPacienteI | undefined;


constructor(private api:ApiService, private router:Router,private activaterouter:ActivatedRoute, private notificacionesService:NotificacionesServiceService){}

ngOnInit(): void {


  const token = localStorage.getItem('token')
    
  if(!token){
    this.router.navigate(['login']);
  }else{
   
  }


  const residenteId = this.activaterouter.snapshot.params['id']; // Obtén el ID del residente desde los parámetros de la URL

  if (residenteId) {
    // Si tienes un ID, establece el pacienteID en tu servicio
    this.api.setPacienteID(residenteId);

    // Realiza la solicitud para obtener los detalles del residente
    this.api.getMedicamentos().subscribe((response) => {
      if (response && response.medicamentos) {
        this.Medicamentos = response.medicamentos;
        console.log(this.Medicamentos, 'medicamentos');

        this.api.getResidenteDetails().subscribe(pacientes =>{
          console.log(pacientes);
          this.pacientes = pacientes;
         })
      


      }
    });
  } else {
    console.log('No se encontró un ID de residente en los parámetros de la URL');
    // Puedes manejar esto según tus necesidades, por ejemplo, redirigir a una página de error
  }


  
}



  
// UNA JOYITA QUE TE MUESTRA LOS DATOS EXTRAS DE CADA MEDICAMENTO Y PERMITE ACTUALIZAR O ELIMINARL

MoreInfo(index: number){

  const medicamento = this.Medicamentos[index]

  
  const residente = this.pacientes

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
       <textarea class="form-control" rows="3" id="observacionesMedicamento"  readonly>${medicamento.Observaciones}</textarea>
      </div>

      <hr class="mx-n3">

    </form>
  `;

  Swal.fire({
    title: 'Detalles del Medicamento',
    icon: 'info',
    width: '60%',
    html: contenidoHtml,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Editar valores',
    denyButtonText: `Eliminar medicamento`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

      const cargo = localStorage.getItem('cargo')

      if(cargo){
        if(cargo === '2' || cargo === '4'){
    
        // Genera el contenido HTML para el modal de edición (similar al modal de detalles)
  const contenidoHtml = `
  <form id="UpdateMedicamento" >

  <hr class="mx-n3">

  <div class="col">
  <mat-label>Al residente asignado</mat-label>
  <select class="form-select" formControlName="residenteM" id="residenteM" readonly>
    <option value="${residente?.id}">${residente?.nombreResidente}</option>
  </select>
</div>


  <hr class="mx-n3">

  <div class="row">
    <div class="col-3">
      <div class="form-group">
        <label for="generico">Genérico</label>
        <select class="form-select" aria-label="Default select example" id="genericMedicamento" formControlName="Generico">
        <option>SI</option>
        <option>N0</option>
      </select> 
     
      </div>  
    </div>
    <div class="col">
      <div class="form-group">
        <label for="CantidadTotal">Cantidad Total</label>
        <input type="number" id="cantidadTotal" class="form-control" value="${medicamento.CantidadTotal}" >
      </div>
    </div>
  </div>

  <hr class="mx-n3">

  <div class="row">
    <div class="col">
      <div class="form-group">
        <label for="marca">Marca</label>
        <input type="text" id="marcaMedicamento" class="form-control" value="${medicamento.Marca}" >
      </div>
     </div>
     <div class="col">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombreMedicamento" class="form-control" value="${medicamento.Nombre}" >
      </div>
     </div>
  </div>

<hr class="mx-n3">

<div class="row">
<div class="col">
    <div class="form-group">
      <label for="Peso">Peso</label>
      <input type="number" id="pesoMedicamento" class="form-control" value="${medicamento.Peso}" >
    </div>
</div>
<div class="col-3">
    <select class="form-select" aria-label="Default select example"  id="medicionMedicamento">
    <option value="0">ml</option>
    <option value="1">g</option>
  </select>



</div>
</div>

<hr class="mx-n3">

<div class="row">
<div class="col">
    <div class="form-group">
       <label for="FechaInicio">Fecha Inicio</label>
       <input type="date" id="fechaInicio" class="form-control" value="${medicamento.FechaInicio}" >
    </div>
</div>
<div class="col-3">
    <div class="form-group">
        <label for="cantidadDiaria">Consumo Diario</label>
       <input type="number" id="cantidadDiaria" class="form-control" value="${medicamento.cantidadDiaria}" >
    </div>
</div>
</div>

<hr class="mx-n3">
    
    <div class="form-group">
     <label for="Codigo">Codigo</label>
      <input type="text" id="codMedicamento" class="form-control" value="${medicamento.Codigo}" >
    </div>

    <hr class="mx-n3">

    <div class="form-group">
     <label for="Codigo">Observaciones</label>
     <textarea class="form-control" rows="3" id="observacionesMedicamento"  >${medicamento.Observaciones}</textarea>
    </div>

    <hr class="mx-n3">

  </form>
`;
        Swal.fire({
        title: 'Editar Medicamento',
        icon: 'info',
        width: '60%',
        html: contenidoHtml,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        }).then((result)=>{
          if(result.isConfirmed){
               // Realiza la solicitud al backend para actualizar los valores
              const formulario = document.querySelector('#UpdateMedicamento') as HTMLFormElement;
              
              if(formulario){
                  const updateData:any = {}; //OBJETO VACIO
                  const elementosArray = Array.from(formulario.elements)
                  const id = medicamento.id;



                   // Itera a través de los elementos del formulario
                  for (const elemento of elementosArray) {
                    if (elemento instanceof HTMLInputElement || elemento instanceof HTMLSelectElement || elemento instanceof HTMLTextAreaElement) {
                      // Verifica que el elemento sea un input o un select
                      const nombre = elemento.getAttribute('id');
                      const valor = elemento.value;

                      if (nombre) {
                        // Agrega el valor al objeto utilizando el nombre del campo como clave
                        updateData[nombre] = valor;
                      }
                    }
                  }

                  console.log(updateData,'sin pasar por el api')
       
                  
                  if (updateData){
                    const notificacion = `Se actualizó con éxito el medicamento`;
                    Swal.fire({
                      icon: 'success',
                      title: 'Actualizar Medicamento',
                      text: `Se actualizó con éxito el medicamento`,
                      confirmButtonText: 'Aceptar',
                    }).then((result)=>{
                      if(result.isConfirmed){
                          
                        this.api.setMedicamentoID(id)
                        this.api.UpdateMedicamento(updateData).subscribe(data =>{
                        console.log(data,'ya paso por el api')
                        this.notificacionesService.agregarNotificacion(notificacion,'green-bg')
                        window.location.reload(); //RECARGA LA PAGINA ACTUAL
    
                      })

                      }  
                    })
                  }
                  
                }
                
              }







        })

        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No posees los permisos adecuados',
            
          })
        }
  
      }
    



 
    }
    
    
    
    else if (result.isDenied) {

      const cargo = localStorage.getItem('cargo')

      if(cargo){
        if(cargo === '4'){


          Swal.fire({
            title: 'Confirmar Eliminación',
            text: '¿Estás seguro de que deseas eliminar este medicamento? Esta acción es irreversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
          }).then((result)=>{
            if(result.isConfirmed){
              // Realiza la solicitud al backend para eliminar el medicamento
              const notificacion = `Se ha eliminado con éxito el medicamento`;
              if (medicamento){
                let data:any= this.Medicamentos;
                const id = medicamento.id;
                this.api.setMedicamentoID(id)
                this.api.DeleteMedicamento(data).subscribe((datos)=>{
                  console.log(datos);
                  this.router.navigate(['homeMedicamentos'])
                })
              }
              this.notificacionesService.agregarNotificacion(notificacion, 'red-bg')
    
            }
    
    
    
          })
            
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No posees los permisos adecuados',
            
          })
        }
  
      }
    

      
    }
  })

}


}

