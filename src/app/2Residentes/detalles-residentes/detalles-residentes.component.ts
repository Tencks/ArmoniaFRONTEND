import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { DetallesPacienteI, listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-residentes',
  templateUrl: './detalles-residentes.component.html',
  styleUrls: ['./detalles-residentes.component.css']
})
export class DetallesResidentesComponent implements OnInit {

  pacientes:listaResidentesI[] =[];
  pacienteDetalles:DetallesPacienteI | undefined;
  
  cargoUsuario = localStorage.getItem('cargo')


  constructor( private router:Router, private api:ApiService, private activaterouter: ActivatedRoute){
    
  }


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
      this.api.getResidenteDetails().subscribe((pacienteDetalles) => {
        this.pacienteDetalles = pacienteDetalles;
        console.log(this.pacienteDetalles, 'hola');
      });
    } else {
      console.log('No se encontró un ID de residente en los parámetros de la URL');
      // Puedes manejar esto según tus necesidades, por ejemplo, redirigir a una página de error
    }
  }



  OnUpdateResident(pacienteID: listaResidentesI['id']){

    const cargo = localStorage.getItem('cargo')

    if(cargo){
      if(cargo === '3' || cargo === '4'){
  
        this.api.setPacienteID(pacienteID)
        this.router.navigate(['updateResidente',pacienteID])
        
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No posees los permisos adecuados',
          
        })
      }

    }
  
  
  }




  OnEgresarResident(){
    
    const cargo = localStorage.getItem('cargo')

    if(cargo){
      if( cargo === '4'){

    if (this.pacienteDetalles){
      const NombreCompleto = `${this.pacienteDetalles.nombreResidente} ${this.pacienteDetalles.apellidoResidente}`    
      
      Swal.fire({
        icon:'error',
        title:'Egresar Residente',
        text:`Está seguro que desea egresar a ${NombreCompleto} `,
        showCancelButton: true,
        confirmButtonText: `Sí`,
        cancelButtonText: `Cancelar`,
        allowOutsideClick: () => !Swal.isLoading() // Evita que se cierre haciendo clic afuera mientras se está procesando
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.pacienteDetalles) {
            
            this.pacienteDetalles.egresado = 'true';
            this.actualizarEstado(this.pacienteDetalles)
          }
        }
      });
    }

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No posees los permisos adecuados',
          
        })
      }

    }
  
  
  }

  actualizarEstado(datos:DetallesPacienteI){
    this.api.egresarResident(datos).subscribe((datos)=>{
      console.log(datos);
      this.router.navigate(['homeEgresados'])

      
    })
  }



}





