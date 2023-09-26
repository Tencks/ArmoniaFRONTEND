import { Location } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-medicamentos',
  templateUrl: './home-medicamentos.component.html',
  styleUrls: ['./home-medicamentos.component.css']
})
export class HomeMedicamentosComponent  implements OnInit{

  pacientes:listaResidentesI[]=[];

  cargoUsuario = localStorage.getItem('cargo')


  constructor(private api:ApiService, private router:Router, private location:Location){  }


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

        this.location.back();
      }
    }
  
   
  }



  this.api.getAllResidents().subscribe(pacientes =>{
    console.log(pacientes);
    

    // Filtrar residentes de residentes egresados 
    this.pacientes = pacientes.filter((paciente) => !paciente.egresado)

   })
}

MoreInfo(pacienteID: listaResidentesI['id']){
  this.api.setPacienteID(pacienteID)
  this.router.navigate(['detallesMedicamentos',pacienteID]);
}



loadNewMedicamento(){
  const cargo = localStorage.getItem('cargo')


  if(cargo){
    if(cargo === '2' || cargo === '4'){

  this.router.navigate(['loadMedicamento']);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No posees los permisos adecuados',
        
      })
    }
  }

}

}

