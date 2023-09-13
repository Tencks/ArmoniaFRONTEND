import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { NotificacionesServiceService } from 'src/app/75Adicionales/751Service/752NotificacionesService/notificaciones-service.service';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { GENERO, GRUPOSANGUINEO, VINCULO } from 'src/app/75Adicionales/Models/10Tulpas/Tulpa.const';
import { loadResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-residente',
  templateUrl: './load-residente.component.html',
  styleUrls: ['./load-residente.component.css']
})
export class LoadResidenteComponent implements OnInit{


  generoOptions= GENERO;
  vinculoOptions = VINCULO;
  sanguineoOptions = GRUPOSANGUINEO;
  
    LoadRForm!: FormGroup;
  
  
  constructor(private api:ApiService, private router:Router, private formBuilder: FormBuilder, private notificaionesService: NotificacionesServiceService){}
  
  ngOnInit(): void {
  
    const cargo = localStorage.getItem('cargo')
  
    
    if(cargo){
      if(cargo >= '2'){
  
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Acesso Denegado',
          text: 'No posees suficientes cargos para esto',
          
        })

        this.router.navigate(['']);
      }
    }
  
   
  
  
    this.LoadRForm = this.formBuilder.group({
      // Define aquí los campos de tu formulario y las validaciones
      nombreResidente : new FormControl('',Validators.required),
      apellidoResidente : new FormControl('',Validators.required),
      dniResidente : new FormControl('',Validators.required),
      fechaNacimiento : new FormControl('',Validators.required),
      edad: new FormControl('',Validators.required),
      genero: new FormControl('',Validators.required),
      medicoDeCabecera: new FormControl('',Validators.required),
      grupoSanguineo: new FormControl('',Validators.required),
      numeroDeHabitacion: new FormControl('',Validators.required),
      observacionesResidente: new FormControl('',Validators.required),
      localidadFamiliar: new FormControl('',Validators.required),
      domicilioFamiliar: new FormControl('',Validators.required),
      nombreFamiliar: new FormControl('',Validators.required),
      apellidoFamiliar: new FormControl('',Validators.required),
      numeroTelefonico: new FormControl('',Validators.required),
      dniFamiliar: new FormControl('',Validators.required),
      numeroAfiliado: new FormControl('',Validators.required),
      obraSocial: new FormControl('',Validators.required),
      vinculoConElResidente: new FormControl('',Validators.required),
      fotoResidente: new FormControl('',Validators.required)
  
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
  
  
  confirmImage(){}
  
  
  
  OnLoadR(form:loadResidentesI){
    this.api.loadResident(form).subscribe(data =>{
      let DataLoadR:loadResidentesI = data;
      console.log(DataLoadR);
      if (DataLoadR != null) {
        const residenteNombreCompleto = `${form.nombreResidente} ${form.apellidoResidente}`;
        const notificacion = `Se ha agregado con éxito al nuevo residente: ${residenteNombreCompleto}`;
        Swal.fire({
          icon: 'success',
          title: 'Agregar residente',
          text: `Se ha agregado con éxito a: ${residenteNombreCompleto}`,
          confirmButtonText: 'Aceptar',
        }).then(() => {
          // Redirige o realiza alguna otra acción después de aceptar la notificación.
          this.notificaionesService.agregarNotificacion(notificacion,'green-bg')
          this.router.navigate(['']);
        });
      }
    });
  }
  
  
  
  onFileSelected(event:any): void{
    const file = event.target.files[0];
      if(file){
        this.convertToBase64(file);
      }
  }
  
  convertToBase64(file : File): void{
    const reader = new FileReader();
     reader.onload = (e:any) =>{
       this.LoadRForm.value.fotoResidente = e.target.result;
     };
     reader.readAsDataURL(file);
  }
  
  }
  
