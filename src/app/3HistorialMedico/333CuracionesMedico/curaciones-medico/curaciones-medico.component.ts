import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import { listaCuracionesI } from 'src/app/75Adicionales/Models/3Medico/Curaciones.interface';

@Component({
  selector: 'app-curaciones-medico',
  templateUrl: './curaciones-medico.component.html',
  styleUrls: ['./curaciones-medico.component.css']
})
export class CuracionesMedicoComponent implements OnInit {


  curaciones: listaCuracionesI['curaciones'] = [];
  


constructor(private api:ApiService, private router:Router){}




ngOnInit(): void {

 

  this.api.getCuracion().subscribe((response) => {
    if (response && response.curaciones) {
      this.curaciones = response.curaciones;
      console.log(this.curaciones, 'muestra las observaciones semanales');
    }
  });
}

MoreInfo(pacienteID: listaResidentesI['id']){
  this.api.setPacienteID(pacienteID)
  this.router.navigate(['viewCuración',pacienteID]);
}


}