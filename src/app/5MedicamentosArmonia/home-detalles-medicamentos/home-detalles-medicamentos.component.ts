import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacionesServiceService } from 'src/app/75Adicionales/751Service/752NotificacionesService/notificaciones-service.service';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { getLocalDataI, listaMedicamentosLocalI } from 'src/app/75Adicionales/Models/5Armonia/DatosArmonia.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-detalles-medicamentos',
  templateUrl: './home-detalles-medicamentos.component.html',
  styleUrls: ['./home-detalles-medicamentos.component.css']
})
export class HomeDetallesMedicamentosComponent implements OnInit {
  
  Local: getLocalDataI | undefined;

  Medicamentos: listaMedicamentosLocalI['localMedicamentos'] = [];

  cargoUsuario = localStorage.getItem('cargo')


  constructor(private api:ApiService, private router:Router, private fb: FormBuilder, private notificacionesService: NotificacionesServiceService,private location:Location){}

  ngOnInit(): void {
      

    
    const cargo = localStorage.getItem('cargo')
    const token = localStorage.getItem('token')
    
    if(!token){
      this.router.navigate(['login']);
    }else{
      if(cargo){
        if(cargo === '2' || cargo === '4'){
    
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Acesso Denegado',
            text: 'No posees suficientes cargos para esto',
            
          })
  
          this.location.back()
        }
      }
    
     
    }
  

    this.api.getLocalData().subscribe(dato =>{
      this.Local = dato;
      console.log(this.Local, 'localA')



      this.api.getMedicationLocal().subscribe((response) => {
        if (response && response.localMedicamentos) {
          this.Medicamentos = response.localMedicamentos;
          console.log(this.Medicamentos, 'medicamentos locales gato');
        }
      });


    })

     

  }

  openUpdateAlert() {
   this.router.navigate(['UpdateArmonia'])
  }

  LoadMedicamentoLocal(){
    this.router.navigate(['loadMedicamentosArmonia'])
  }


  // UNA JOYITA QUE TE MUESTRA LOS DATOS EXTRAS DE CADA MEDICAMENTO Y PERMITE ACTUALIZAR O ELIMINARL

MoreInfo(index: number){

  const medicamento = this.Medicamentos[index]

  
  const LocalArmonia = this.Local

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
         <input type="text" id="cantidadDiaria" class="form-control" value="${medicamento.CantidadDiaria}" readonly>
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
  <select class="form-select" formControlName="residenteM" id="localA" readonly>
    <option value="${LocalArmonia?.id}">${LocalArmonia?.nombre}</option>
  </select>
</div>


  <hr class="mx-n3">

  <div class="row">
    <div class="col-3">
      <div class="form-group">
        <label for="generico">Genérico</label>
        <select class="form-select" aria-label="Default select example" id="genericMedicamento" formControlName="Generico">
        <option>Y</option>
        <option>N</option>
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
    <option value="2">píldora/as</option>
    <option value="3">caja/as</option>
    <option value="4">frasco/os</option>
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
       <input type="number" id="cantidadDiaria" class="form-control" value="${medicamento.CantidadDiaria}" >
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
                        this.api.UpdateMedicamentoLocal(updateData).subscribe(data =>{
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
              title: 'Acesso Denegado',
              text: 'No posees suficientes cargos para esto',
            })
    
            this.location.forward()
          }
        }
      
       
      
    



    } else if (result.isDenied) {

      const cargo = localStorage.getItem('cargo')

        if(cargo){
          if(cargo === '2' || cargo === '4'){
      

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
                  this.api.DeleteMedicametoLocal(data).subscribe((datos)=>{
                    console.log(datos);
                    window.location.reload();
                  })
                }
                this.notificacionesService.agregarNotificacion(notificacion, 'red-bg')
      
              }
      
      
      
            })
      
            
          }
            
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Acesso Denegado',
              text: 'No posees suficientes cargos para esto',
              
            })
    
            this.location.forward()
          }
        }
      
       




  })

}

  
}


