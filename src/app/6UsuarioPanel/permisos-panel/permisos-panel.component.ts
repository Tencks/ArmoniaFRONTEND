import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionesServiceService } from 'src/app/75Adicionales/751Service/752NotificacionesService/notificaciones-service.service';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { listaUsersDataI } from 'src/app/75Adicionales/Models/1LoginRegister/login.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permisos-panel',
  templateUrl: './permisos-panel.component.html',
  styleUrls: ['./permisos-panel.component.css']
})
export class PermisosPanelComponent implements OnInit {

UsersData:listaUsersDataI[]=[];

  constructor(private api : ApiService, private router:Router,private notificacionesService : NotificacionesServiceService){

  }


  ngOnInit(): void {

// VERIFICADOR DE CARGO PARA TENER INGRESO SIN SE POSEEN PERMISOS
const cargo = localStorage.getItem('cargo')
  
    
if(cargo){
  if(cargo >= '4'){

  }else{
    Swal.fire({
      icon: 'error',
      title: 'Acesso Denegado',
      text: 'No posees suficientes cargos para esto',
      
    })

    this.router.navigate(['']);
  }
}



      this.api.getUsersData().subscribe((UsersData) =>{
        
        this.UsersData = UsersData
        console.log(UsersData)
      })
  }


  MoreInfo(index: number){

    const permisos = this.UsersData[index]
  
    
    const usuario = permisos.username
  
    const contenidoHtml = `
      <form>
  
      <hr class="mx-n3">
  
      <div class="row">
        <div class="col-3">
          <div class="form-group">
            <label for="generico">Cargo</label>
            <input type="text" id="username" class="form-control" value="${permisos.cargo}" readonly>
          </div>  
        </div>
        <div class="col">
          <div class="form-group">
            <label for="CantidadTotal">Usuario</label>
            <input type="text" id="cargo" class="form-control" value="${permisos.username}" readonly>
          </div>
        </div>
      </div>
  
       <hr class="mx-n3">
  
      </form>
    `;
  
    Swal.fire({
      title: 'Ajustar Cargo',
      icon: 'info',
      width: '60%',
      html: contenidoHtml,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Editar cargo',
      denyButtonText: `Eliminar usuario`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {


        const contenidoHtml = `
        <form id="PermisosUsers">
    
        <hr class="mx-n3">
    
        <div class="row">
         
               <div class="col-4">
                      <label for="CantidadTotal">Cargo</label>
                  <select class="form-select" aria-label="Default select example"  id="cargo">
                    <option value="0">invitado</option>
                    <option value="1">Empleado diario</option>
                    <option value="2">Enfermero/a</option>
                    <option value="3">Medico/a</option>
                    <option value="4">Admin</option>
                  </select>
              </div> 
          
          <div class="col">
            <div class="form-group">
              <label for="CantidadTotal">Usuario</label>
              <input type="text" id="username" class="form-control" value="${permisos.username}" readonly>
            </div>
          </div>


          
        </div>
    
         <hr class="mx-n3">
    
         <div class="row">
         <div class="col">
           <div class="form-group">
             <label for="marca">Correo electrónico</label>
             <input type="email" id="email" class="form-control" value="${permisos.email}" readonly>
           </div>
          </div>
          <div class="col-3">
           <div class="form-group">
             <label for="nombre">Contraseña</label>
             <input type="password" id="password" class="form-control" value="${permisos.password}" readonly>
           </div>
          </div>
       </div>


       <hr class="mx-n3">

        </form>
      `;
    

        Swal.fire({
          title: 'Editar Cargo',
          icon: 'info',
          width: '60%',
          html: contenidoHtml,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar',
          }).then((result)=>{
            if (result.isConfirmed){
                // Realiza la solicitud al backend para actualizar los valores
          const formulario = document.querySelector('#PermisosUsers') as HTMLFormElement;
         
          if(formulario){
              const updateData:any = {}; //OBJETO VACIO
              const elementosArray = Array.from(formulario.elements)
              const id = permisos.id;
 
 
 
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
                const notificacion = `Se actualizaron los permisos de ${permisos.username}`;
                Swal.fire({
                  icon: 'success',
                  title: 'Actualizar Permisos',
                  text: `Se actualizaron los permisos de ${permisos.username}`,
                  confirmButtonText: 'Aceptar',
                }).then((result)=>{
                  if(result.isConfirmed){
                      
                    this.api.setuserID(id)
                    this.api.UpdateUsersData(updateData).subscribe(data =>{
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
        
        
  
      } else if (result.isDenied) {
  
  
        Swal.fire({
          title: 'Confirmar Eliminación',
          text: '¿Estás seguro de que deseas eliminar este usuario? Esta acción es irreversible.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
        }).then((result)=>{
          if(result.isConfirmed){
            // Realiza la solicitud al backend para eliminar el medicamento
            const notificacion = `Se ha eliminado con éxito el usuario`;
            if (permisos){
              let data:any= this.UsersData;
              const id = permisos.id;
              this.api.setuserID(id)
              this.api.DeleteUser(data).subscribe((datos)=>{
                console.log(datos);
                window.location.reload();
              })
            }
            this.notificacionesService.agregarNotificacion(notificacion, 'red-bg')
  
          }
  
  
  
        })
  
        
      }
    })
  
  }
  



  

}