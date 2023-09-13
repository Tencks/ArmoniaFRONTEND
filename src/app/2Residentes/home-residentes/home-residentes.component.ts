import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { TokenI } from 'src/app/75Adicionales/Models/1LoginRegister/login.interface';
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


  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
  
    

     this.api.getAllResidents().subscribe(pacientes =>{
      console.log(pacientes);
      this.pacientes = pacientes;
     })
  }

test(){
  const test = this.api.checkMedicationResidenteStatus()
  console.log(test, 'pto')
}
test2(){
  const test = this.api.checkMedicationLocalStatus()
  console.log(test, 'usted')
}




  MoreInfo(pacienteID: listaResidentesI['id']){
    this.api.setPacienteID(pacienteID)
    this.router.navigate(['detallesResidentes',pacienteID]);
  }

  onLogout() {
    const token = localStorage.getItem("token"); // Obtener el token del localStorage
  
    if (token) {
      this.api.Logout({ token: token }).subscribe(data => {
        console.log(data);
        let tokenResponse: TokenI = data;
        console.log(tokenResponse);
  
        // Eliminar el token del localStorage después del cierre de sesión
        localStorage.removeItem("token");
        this.router.navigate(['']);
      });
    }
  }
  


loadNew(){

  const cargo = localStorage.getItem('cargo')

  if(cargo){
    if(cargo >= '2'){

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
