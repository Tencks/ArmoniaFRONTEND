import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent implements OnInit{


  pacientes:listaResidentesI[]=[];
  
constructor(private api:ApiService, private router:Router){}


ngOnInit(): void {
    
  this.api.getAllResidents().subscribe(pacientes =>{
    console.log(pacientes);
    this.pacientes = pacientes;
   })

}


MoreInfo(pacienteID: listaResidentesI['id']){
  this.api.setPacienteID(pacienteID)
  this.router.navigate(['detallesMedicos',pacienteID]);
}

}
