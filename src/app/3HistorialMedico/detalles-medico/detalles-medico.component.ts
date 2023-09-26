import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { DetallesPacienteI, listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-medico',
  templateUrl: './detalles-medico.component.html',
  styleUrls: ['./detalles-medico.component.css']
})
export class DetallesMedicoComponent implements OnInit {

  pacientes:listaResidentesI[] =[];
  pacienteDetalles:DetallesPacienteI | undefined;

  cargoUsuario = localStorage.getItem('cargo')


constructor(private api:ApiService, private router:Router, private activaterouter: ActivatedRoute){}





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




OnLoadSO(){
  const cargo = localStorage.getItem('cargo')

  if(cargo){
    if(cargo === '2' || cargo === '3' || cargo === '4'){

      this.router.navigate(['loadObservación'])

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No posees los permisos adecuados',
        
      })
    }

  }


}

OnLoadPracticaEnfermeria(){
  const cargo = localStorage.getItem('cargo')

  if(cargo){
    if(cargo === '2' || cargo === '3' || cargo === '4'){

      this.router.navigate(['loadCuración'])
      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No posees los permisos adecuados',
        
      })
    }

  }

}





MoreInfo(pacienteID: listaResidentesI['id']){
  this.api.setPacienteID(pacienteID)
  this.router.navigate(['viewObservación',pacienteID]);
}


}

