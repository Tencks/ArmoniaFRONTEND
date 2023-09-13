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

  constructor(private api:ApiService, private router:Router){  }


ngOnInit(): void {
  this.api.getAllResidents().subscribe(pacientes =>{
    console.log(pacientes);
    this.pacientes = pacientes;
   })
}

MoreInfo(pacienteID: listaResidentesI['id']){
  this.api.setPacienteID(pacienteID)
  this.router.navigate(['detallesMedicamentos',pacienteID]);
}



loadNewMedicamento(){
  const cargo = localStorage.getItem('cargo')


  if(cargo){
    if(cargo >= '2'){

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

