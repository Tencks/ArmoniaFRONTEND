import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { NotificacionesServiceService } from 'src/app/75Adicionales/751Service/752NotificacionesService/notificaciones-service.service';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { GENERICO, GRUPOSANGUINEO, TIPOMEDICAMENTO } from 'src/app/75Adicionales/Models/10Tulpas/Tulpa.const';
import { listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import { LoadMedicamentoI } from 'src/app/75Adicionales/Models/4Medicamentos/Medicamentos.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-medicamento',
  templateUrl: './load-medicamento.component.html',
  styleUrls: ['./load-medicamento.component.css']
})
export class LoadMedicamentoComponent implements OnInit{

  medicamentoOptions = TIPOMEDICAMENTO;
  genericoOptions = GENERICO;
  
  
   LoadMedicamentoForm !: FormGroup;
  
   residentes: listaResidentesI[] = [];

   cargoUsuario = localStorage.getItem('cargo')

  
    constructor(private router:Router, private api:ApiService, private formBuilder: FormBuilder, private notificacionesService: NotificacionesServiceService, private location: Location){}
  
    ngOnInit(): void {

      const cargo = localStorage.getItem('cargo')
      const token = localStorage.getItem('token')
      
      if(!token){
        this.router.navigate(['login']);
      }else{
        if(cargo){
          if(cargo === '2' || cargo === '4'){
      
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Acesso Denegado',
              text: 'No posees suficientes cargos para esto',
              
            })
    
            this.location.back();
          }
        }
      
       
      }
    
  
      this.api.getAllResidents().subscribe(data =>{
            
        this.residentes = data.filter((paciente) => !paciente.egresado)
    })
  
  
      this.LoadMedicamentoForm = this.formBuilder.group({
  
        residenteM : new FormControl('',Validators.required),
        genericMedicamento : new FormControl('',Validators.required),
        nombreMedicamento : new FormControl('',Validators.required),
        marcaMedicamento : new FormControl(''),
        pesoMedicamento : new FormControl('',Validators.required),

        cantidadTotal : new FormControl('',Validators.required),
        fechaInicio : new FormControl('',Validators.required),
        cantidadDiaria : new FormControl('',Validators.required),
        medicionMedicamento : new FormControl('',Validators.required),
        codMedicamento : new FormControl('',Validators.required),
        observacionesMedicamento : new FormControl('',Validators.required),
        derivacionesMedicamento : new FormControl('',Validators.required),
  
  
      });
        
    }
  

  // CONFIGURAR STEPPER
  orientation: StepperOrientation = 'horizontal'; // Puedes ajustar la orientación según tus necesidades
  currentStep = 0; // Variable para rastrear la etapa actual
  
  nextStep() {
    this.currentStep++;
    console.log(this.currentStep)
  }
  previousStep() {
    this.currentStep--;
    console.log(this.currentStep)

  }
  


    OnLoadMedicamento(form:LoadMedicamentoI){
      this.api.LoadNewMedicamento(form).subscribe(newwMedicamento =>{
        let newMedicamento:LoadMedicamentoI = newwMedicamento;
        console.log(newMedicamento)
        if (newMedicamento){



                // Itera a través de los elementos del formulario
                for (const residente of this.residentes) {
                                    
                  // Verifica que el elemento sea un input o un select
                  const nombre = residente.nombreResidente;
                  const apellido = residente.apellidoResidente;

                  if (nombre && apellido) {
                    // Agrega el valor al objeto utilizando el nombre del campo como clave
                    const residenteNombreCompleto = `${nombre} ${apellido}`;





        
          const medicamento = `${form.nombreMedicamento}`
          const notificacion = `Se ha agregado con éxito el medicamento ${medicamento} a ${residenteNombreCompleto}`;

          Swal.fire({
            icon: 'success',
            title: 'Agregar medicamento',
            text: `Se ha agregado con éxito el medicamento ${medicamento} a ${residenteNombreCompleto}`,
            confirmButtonText: 'Aceptar',
          }).then(() =>{

            this.notificacionesService.agregarNotificacion(notificacion,'green-bg')
            this.router.navigate(['homeMedicamentos'])
          })

        }
      } 
        }
      })
  
    }
  
    CreateResidenteGO(){
      this.router.navigate(['loadResidente'])
    }
  
  
  }
  
