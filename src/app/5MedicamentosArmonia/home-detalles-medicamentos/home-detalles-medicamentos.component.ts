import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { getLocalDataI, listaMedicamentosLocalI } from 'src/app/75Adicionales/Models/5Armonia/DatosArmonia.interface';

@Component({
  selector: 'app-home-detalles-medicamentos',
  templateUrl: './home-detalles-medicamentos.component.html',
  styleUrls: ['./home-detalles-medicamentos.component.css']
})
export class HomeDetallesMedicamentosComponent implements OnInit {
  
  Local: getLocalDataI | undefined;

  Medicamentos: listaMedicamentosLocalI['localMedicamentos'] = [];

  constructor(private api:ApiService, private router:Router, private fb: FormBuilder){}

  ngOnInit(): void {
      
    this.api.getLocalData().subscribe(dato =>{
      this.Local = dato;
      console.log(this.Local, 'localA')



      this.api.getMedicationLocal().subscribe((response) => {
        if (response && response.localMedicamentos) {
          this.Medicamentos = response.localMedicamentos;
          console.log(this.Medicamentos, 'medicamentos locales gato');
        }
      });


    })

     

  }

  openUpdateAlert() {
   this.router.navigate(['UpdateArmonia'])
  }

  LoadMedicamentoLocal(){
    this.router.navigate(['loadMedicamentosArmonia'])
  }
  
}


