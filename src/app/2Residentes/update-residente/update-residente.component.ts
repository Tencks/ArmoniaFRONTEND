import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionesServiceService } from 'src/app/75Adicionales/751Service/752NotificacionesService/notificaciones-service.service';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { GENERO, GRUPOSANGUINEO, VINCULO } from 'src/app/75Adicionales/Models/10Tulpas/Tulpa.const';
import { DetallesPacienteI, loadResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-residente',
  templateUrl: './update-residente.component.html',
  styleUrls: ['./update-residente.component.css']
})
export class UpdateResidenteComponent implements OnInit{


  generoOptions= GENERO;
  vinculoOptions = VINCULO;
  sanguineoOptions = GRUPOSANGUINEO;
  
    LoadRForm!: FormGroup;
    Residente: DetallesPacienteI | undefined;
    selectedFile: string | undefined; // Declara la variable selectedFile
  
  constructor(private api:ApiService, private router:Router, private formBuilder: FormBuilder, private notificaionesService: NotificacionesServiceService, private activaterouter: ActivatedRoute){}
  
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


      const residenteId = this.activaterouter.snapshot.params['id']; // Obtén el ID del residente desde los parámetros de la URL

      if (residenteId) {
        // Si tienes un ID, establece el pacienteID en tu servicio
        this.api.setPacienteID(residenteId);
  
        // Realiza la solicitud para obtener los detalles del residente
        this.api.getResidenteDetails().subscribe((Residente) => {
          this.Residente = Residente;
          console.log(this.Residente, 'hola');
        });
      } else {
        console.log('No se encontró un ID de residente en los parámetros de la URL');
        // Puedes manejar esto según tus necesidades, por ejemplo, redirigir a una página de error
      }
    
      

      
    // ESTE ES EL MÉTODO PARA HACER QUE EL FORMULARIO SE CARGUE CON LOS DATOS ACTUALES DEL USUARIO
    this.api.getResidenteDetails().subscribe(Residente => {
      this.Residente = Residente;

      this.LoadRForm.patchValue({

        nombreResidente: Residente.nombreResidente ,
        apellidoResidente: Residente.apellidoResidente ,
        dniResidente: Residente.dniResidente ,
        fechaNacimiento: Residente.fechaNacimiento ,
        edad: Residente.edad ,
        genero: Residente.genero ,
        medicoDeCabecera: Residente.medicoDeCabecera ,
        grupoSanguineo: Residente.grupoSanguineo ,
        numeroDeHabitacion: Residente.numeroDeHabitacion ,
        observacionesResidente: Residente.observacionesResidente ,
        localidadFamiliar: Residente.localidadFamiliar ,
        domicilioFamiliar: Residente.domicilioFamiliar ,
        nombreFamiliar: Residente.nombreFamiliar ,
        apellidoFamiliar: Residente.apellidoFamiliar ,
        numeroTelefonico: Residente.numeroTelefonico ,
        dniFamiliar: Residente.dniFamiliar ,
        numeroAfiliado: Residente.numeroAfiliado ,
        obraSocial: Residente.obraSocial ,
        vinculoConElResidente: Residente.vinculoConElResidente ,
        
      })



      console.log(Residente, 'datos del local')
    })

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
      observacionesResidente: new FormControl(''),
      localidadFamiliar: new FormControl('',Validators.required),
      domicilioFamiliar: new FormControl('',Validators.required),
      nombreFamiliar: new FormControl('',Validators.required),
      apellidoFamiliar: new FormControl('',Validators.required),
      numeroTelefonico: new FormControl('',Validators.required),
      dniFamiliar: new FormControl('',Validators.required),
      numeroAfiliado: new FormControl('',Validators.required),
      obraSocial: new FormControl('',Validators.required),
      vinculoConElResidente: new FormControl('',Validators.required),
      fotoResidente: new FormControl('')
  
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

  OnLoadR(){
    if (this.LoadRForm.valid){
      const updateData = this.LoadRForm.value;
    this.api.updateResident(updateData).subscribe(data =>{
     
      console.log(data);

      if (updateData != null) {
        const residenteNombreCompleto = `${updateData.nombreResidente} ${updateData.apellidoResidente}`;
        const notificacion = `Se actualizó con éxito los datos de ${residenteNombreCompleto}`;
        Swal.fire({
          icon: 'success',
          title: 'Actualizar residente',
          text:  `Se actualizó con éxito los datos de ${residenteNombreCompleto}`,
          confirmButtonText: 'Aceptar',
        }).then(() => {
          // Redirige o realiza alguna otra acción después de aceptar la notificación.
          this.notificaionesService.agregarNotificacion(notificacion,'green-bg')
          this.router.navigate(['']);
        });
      }
    });
  }
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
  
