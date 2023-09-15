import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { NotificacionesServiceService } from 'src/app/75Adicionales/751Service/752NotificacionesService/notificaciones-service.service';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { getLocalDataI } from 'src/app/75Adicionales/Models/5Armonia/DatosArmonia.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-armonia-update',
  templateUrl: './armonia-update.component.html',
  styleUrls: ['./armonia-update.component.css']
})
export class ArmoniaUpdateComponent implements OnInit{

  Local: getLocalDataI | undefined;


  ArmoniaForm!: FormGroup;
  


  constructor(private api:ApiService, private router:Router, private formBuilder: FormBuilder, private notificacionesService : NotificacionesServiceService){

    this.ArmoniaForm = this.formBuilder.group({
      nombre: new FormControl(''), // Puedes inicializar estos valores con los datos actuales del usuario
      foto:new FormControl(''),
      localidad: new FormControl(''), 
      domicilio:new FormControl(''),   // Puedes inicializar estos valores con los datos actuales del usuario
      cuil:new FormControl(''),
      fechaCreacion:new FormControl(''),
      numeroTelefonico: new FormControl(''),

      // Otros campos del usuario
    });

     // Obtén el ID del usuario conectado al inicializar el componente
     const userID = localStorage.getItem('id');
    
     // Llama a la función para establecer el ID del usuario
     this.MoreInfo(userID);
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



  ngOnInit(): void {
      
    // ESTE ES EL MÉTODO PARA HACER QUE EL FORMULARIO SE CARGUE CON LOS DATOS ACTUALES DEL USUARIO
    this.api.getLocalData().subscribe(Local => {
      this.Local = Local;

      this.ArmoniaForm.patchValue({
       
        nombre: Local.nombre ,
        
        localidad: Local.localidad ,
        domicilio: Local.domicilio ,
        cuil: Local.cuil ,
        fechaCreacion: Local.fechaCreacion ,
        numeroTelefonico: Local.numeroTelefonico ,
      })



      console.log(Local, 'datos del local')
    })

  }









  
  MoreInfo(userID: string | null) {
    if (userID !== null) {
      // Establece el ID del paciente (usuario)
      this.api.setuserID(userID);
    } else {
      // Trata el caso en el que no se pueda obtener el ID del usuario
      console.error('No se pudo obtener el ID del usuario.');
    }
  }




  
 
 
  onUpdateLocal() {
    if (this.ArmoniaForm.valid) {
      const updatedData = this.ArmoniaForm.value; // Obtener los datos actualizados del formulario

      // Llamar a la función de actualización del usuario
      this.api.updateLocalData(updatedData).subscribe(updatedUser => {
        // Realizar acciones después de que los datos se hayan actualizado
        console.log(updatedUser)
        if(updatedData != null){
          const local = `${updatedData.nombre}`
          const notificacion = `Se ha realizado con éxito la actualización de ${local}`
          Swal.fire({
            icon:'success',
            title: 'Actualizar Datos',
            text: `Se ha realizado con éxito la actualización de ${local} `,
            confirmButtonText: 'Aceptar'
          }).then(() =>{

            this.notificacionesService.agregarNotificacion(notificacion,'green-bg')
            this.router.navigate(['homeArmonia'])
          })
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
       this.ArmoniaForm.value.foto = e.target.result;
     };
     reader.readAsDataURL(file);
  }
  
}


