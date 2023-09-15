import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacionesServiceService } from 'src/app/75Adicionales/751Service/752NotificacionesService/notificaciones-service.service';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import { LoadSemanalOI } from 'src/app/75Adicionales/Models/3Medico/ObservacionesSemanal.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-observaciones-medico',
  templateUrl: './load-observaciones-medico.component.html',
  styleUrls: ['./load-observaciones-medico.component.css']
})
export class LoadObservacionesMedicoComponent implements OnInit {

  LoadSemanalOForm !: FormGroup;
  residentes: listaResidentesI[] = [];
  
  
  
    constructor(private api:ApiService, private router:Router, private fomBuilder: FormBuilder, private notificacionesService: NotificacionesServiceService){}
  
  
    ngOnInit(): void {
      this.api.getAllResidents().subscribe(residentes =>{
        this.residentes = residentes;
      })
      
      this.LoadSemanalOForm = this.fomBuilder.group({
  
        residenteS : new FormControl('',Validators.required),
        fechaConsulta : new FormControl('',Validators.required),
        tensionArterial : new FormControl('',Validators.required),
        glucemia : new FormControl('',Validators.required),
        saturacion : new FormControl('',Validators.required),
        pulso : new FormControl('',Validators.required),
        observacionesSemanales : new FormControl('',),
        derivacionesSemanales : new FormControl('',),
  
      })
  
  
  
    }
  
    OnLoadSemanalO(form:LoadSemanalOI){
      this.api.LoadNewSemanalO(form).subscribe(data2 =>{
        let SemanalO:LoadSemanalOI = data2;
        console.log(SemanalO)
        if (SemanalO != null)
      
        {

          // Itera a través de los elementos del formulario
          for (const residente of this.residentes) {
           
             // Verifica que el elemento sea un input o un select
             const nombre = residente.nombreResidente;
             const apellido = residente.apellidoResidente;

             if (nombre && apellido) {
               // Agrega el valor al objeto utilizando el nombre del campo como clave
               const residenteNombreCompleto = `${nombre} ${apellido}`;
        


const notificacion = `Se ha agregado con éxito la observación semanal a ${residenteNombreCompleto}`;


Swal.fire({
icon: 'success',
title: 'Agregar Observación',
text: `Se ha agregado con éxito la observación semanal a ${residenteNombreCompleto}`,

}).then(()=>{

this.notificacionesService.agregarNotificacion(notificacion,'green-bg')
this.router.navigate(['homeMedico'])
})

}

}
}
  
  
      }
    
  
  )}
}