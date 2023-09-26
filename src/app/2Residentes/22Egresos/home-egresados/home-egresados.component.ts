import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';

@Component({
  selector: 'app-home-egresados',
  templateUrl: './home-egresados.component.html',
  styleUrls: ['./home-egresados.component.css']
})
export class HomeEgresadosComponent   implements OnInit  {

  data: any[] = [];

  pacientes:listaResidentesI[]=[];


  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
  
    
    this.api.getAllResidents().subscribe(pacientes =>{
      console.log(pacientes);
      

      // Filtrar residentes de residentes egresados 
      this.pacientes = pacientes.filter((paciente) => paciente.egresado)

     })

  }




  MoreInfo(pacienteID: listaResidentesI['id']){
    this.api.setPacienteID(pacienteID)
    this.router.navigate(['detallesEgresados',pacienteID]);
  }
}
