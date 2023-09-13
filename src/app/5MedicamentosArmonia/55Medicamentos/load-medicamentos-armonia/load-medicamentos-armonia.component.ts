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
  
    constructor(private router:Router, private api:ApiService, private formBuilder: FormBuilder, private notificacionesService: NotificacionesServiceService){}
  
    ngOnInit(): void {
  
      this.api.getLocalData().subscribe(dato =>{
        this.Local = dato;
        console.log(this.Local, 'localA')
      })


   
  
  
      this.LoadMedicamentoLocalForm = this.formBuilder.group({
  
        localA : new FormControl('',Validators.required),
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

          const residenteNombreCompleto = `${form.localA}`;
          const medicamento = `${form.nombreMedicamento}`
          const notificacion = `Se ha agregado con éxito el medicamento ${medicamento} a ${residenteNombreCompleto}`;

          Swal.fire({
            icon: 'success',
            title: 'Agregar medicamento',
            text: `Se ha agregado con éxito el medicamento ${medicamento} a ${residenteNombreCompleto}`,
            confirmButtonText: 'Aceptar',
          }).then(() =>{

            this.notificacionesService.agregarNotificacion(notificacion,'green-bg')
            this.router.navigate([''])
          })

          
        }
      })
  
    }
  
    CreateResidenteGO(){
      this.router.navigate(['loadResidente'])
    }
  
  
  }
  
