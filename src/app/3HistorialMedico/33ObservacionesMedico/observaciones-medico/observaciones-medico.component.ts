import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { listaSemanalOI } from 'src/app/75Adicionales/Models/3Medico/ObservacionesSemanal.interface';

@Component({
  selector: 'app-observaciones-medico',
  templateUrl: './observaciones-medico.component.html',
  styleUrls: ['./observaciones-medico.component.css']
})
export class ObservacionesMedicoComponent implements OnInit {


  SemanalOb: listaSemanalOI['signosVitales'] = [];


constructor(private api:ApiService, private router:Router){}




ngOnInit(): void {

  this.api.getSemanalO().subscribe((response) => {
    if (response && response.signosVitales) {
      this.SemanalOb = response.signosVitales;
      console.log(this.SemanalOb, 'muestra las observaciones semanales');
    }
  });
}




}