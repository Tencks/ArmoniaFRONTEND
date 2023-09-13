import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacionesServiceService } from 'src/app/75Adicionales/751Service/752NotificacionesService/notificaciones-service.service';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import { LoadCuracionI } from 'src/app/75Adicionales/Models/3Medico/Curaciones.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-curaciones-medico',
  templateUrl: './load-curaciones-medico.component.html',
  styleUrls: ['./load-curaciones-medico.component.css']
})
export class LoadCuracionesMedicoComponent implements OnInit {

  LoadCuracionForm !: FormGroup;
  residentes: listaResidentesI[] = [];
  
  
  
    constructor(private api:ApiService, private router:Router, private fomBuilder: FormBuilder, private notificacionesService:NotificacionesServiceService){}
  
  
    ngOnInit(): void {
      this.api.getAllResidents().subscribe(data =>{
        this.residentes = data;
      })
      
      this.LoadCuracionForm = this.fomBuilder.group({
  
        residenteC : new FormControl('',Validators.required),
        fechaRealizada : new FormControl('',Validators.required),
        profesional : new FormControl('',Validators.required),
        medicacionAplicada : new FormControl('',Validators.required),
     
  
      })
  
  
  
    }
  
    OnLoadCuracion(form:LoadCuracionI){
      this.api.LoadNewCuracion(form).subscribe(data2 =>{
        let Curacion:LoadCuracionI = data2;
        console.log(Curacion)
        if (Curacion != null){
          const residenteNombreCompleto = `${form.residenteC}`;
          const medicamento = `${form.medicacionAplicada}`
          const notificacion = `Se ha aplicado ${medicamento} con éxito a ${residenteNombreCompleto}`;


          Swal.fire({
            icon: 'success',
            title: 'Agregar Curación',
            text: `Se ha aplicado ${medicamento} con éxito a ${residenteNombreCompleto}`,
            
          }).then(()=>{

            this.notificacionesService.agregarNotificacion(notificacion,'green-bg')
            this.router.navigate(['homeMedico'])
          })
          
        }
      })
  
  
  
  
    }
  
  
  
  
  }
  