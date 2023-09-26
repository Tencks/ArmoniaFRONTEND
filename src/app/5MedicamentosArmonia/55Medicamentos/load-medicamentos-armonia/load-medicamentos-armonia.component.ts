import { Location } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { NotificacionesServiceService } from 'src/app/75Adicionales/751Service/752NotificacionesService/notificaciones-service.service';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { GENERICO, TIPOMEDICAMENTO } from 'src/app/75Adicionales/Models/10Tulpas/Tulpa.const';
import { LoadMedicamentoLocalI, getLocalDataI } from 'src/app/75Adicionales/Models/5Armonia/DatosArmonia.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-medicamentos-armonia',
  templateUrl: './load-medicamentos-armonia.component.html',
  styleUrls: ['./load-medicamentos-armonia.component.css']
})
export class LoadMedicamentosArmoniaComponent  implements OnInit{

  medicamentoOptions = TIPOMEDICAMENTO;
  genericoOptions = GENERICO;
  
  
  LoadMedicamentoLocalForm !: FormGroup;
  
   Local: getLocalDataI | undefined;
  
    constructor(private router:Router, private api:ApiService, private formBuilder: FormBuilder, private notificacionesService: NotificacionesServiceService,private location:Location){}
  
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
    
            this.location.back()
          }
        }
      
       
      }
    
  
      this.api.getLocalData().subscribe(dato =>{
        this.Local = dato;
        console.log(this.Local, 'localA')
      })


   
  
  
      this.LoadMedicamentoLocalForm = this.formBuilder.group({
  
        localA : new FormControl('1',Validators.required),
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
  


    OnLoadMedicamento(form:LoadMedicamentoLocalI){
      this.api.loadNewMedicacionLocal(form).subscribe(newwMedicamento =>{
        let newMedicamento:LoadMedicamentoLocalI = newwMedicamento;
        console.log(newMedicamento)
        if (newMedicamento){




                // Itera a través de los elementos del formulario
                if (this.Local) {
                                    
                  // Verifica que el elemento sea un input o un select
                  const nombre = this.Local.nombre;
                  
                  if (nombre) {
                    // Agrega el valor al objeto utilizando el nombre del campo como clave
                    const localNombre = `${nombre}`;





         
          const medicamento = `${form.nombreMedicamento}`
          const notificacion = `Se ha agregado con éxito el medicamento ${medicamento} a ${localNombre}`;

          Swal.fire({
            icon: 'success',
            title: 'Agregar medicamento',
            text: `Se ha agregado con éxito el medicamento ${medicamento} a ${localNombre}`,
            confirmButtonText: 'Aceptar',
          }).then(() =>{

            this.notificacionesService.agregarNotificacion(notificacion,'green-bg')
            this.router.navigate(['homeArmonia'])
          })

          
        }
      }
    }})
    
    }
  
    CreateResidenteGO(){
      this.router.navigate(['loadResidente'])
    }
  
  
  }
  
