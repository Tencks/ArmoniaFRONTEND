import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-residentes',
  templateUrl: './home-residentes.component.html',
  styleUrls: ['./home-residentes.component.css']
})
export class HomeResidentesComponent  implements OnInit  {

  data: any[] = [];

  pacientes:listaResidentesI[]=[];

 cargoUsuario = localStorage.getItem('cargo')

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {


     this.api.getAllResidents().subscribe(pacientes =>{
      console.log(pacientes);
      

      // Filtrar residentes de residentes egresados 
      this.pacientes = pacientes.filter((paciente) => !paciente.egresado)

     })
  }




  MoreInfo(pacienteID: listaResidentesI['id']){
    this.api.setPacienteID(pacienteID)
    this.router.navigate(['detallesResidentes',pacienteID]);
  }



loadNew(){

  const cargo = localStorage.getItem('cargo')

  if(cargo){
    if(cargo === '4'){

      this.router.navigate(['loadResidente']);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No posees los permisos adecuados',
        
      })
    }
  }


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
