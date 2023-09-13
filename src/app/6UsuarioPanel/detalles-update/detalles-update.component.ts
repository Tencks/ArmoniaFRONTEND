import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { NotificacionesServiceService } from 'src/app/75Adicionales/751Service/752NotificacionesService/notificaciones-service.service';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { CARGO } from 'src/app/75Adicionales/Models/10Tulpas/Tulpa.const';
import { getUserDataI, putUserDataI } from 'src/app/75Adicionales/Models/5Armonia/DatosArmonia.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-update',
  templateUrl: './detalles-update.component.html',
  styleUrls: ['./detalles-update.component.css']
})
export class DetallesUpdateComponent implements OnInit{

  userDatos:getUserDataI| undefined;
  putUserDatos:putUserDataI|undefined;
  userForm!: FormGroup;
  cargoClass = CARGO;


  constructor(private api:ApiService, private router:Router, private formBuilder: FormBuilder, private notificacionesService : NotificacionesServiceService){

    this.userForm = this.formBuilder.group({
      username: new FormControl(''), // Puedes inicializar estos valores con los datos actuales del usuario
      email:new FormControl(''),
      fotoUser: new FormControl(''), 
      descriptionUser:new FormControl(''),   // Puedes inicializar estos valores con los datos actuales del usuario
      password:new FormControl(''),
      birthday:new FormControl(''),
      cargo: new FormControl(''),
      numCelular: new FormControl(''),
      direccion: new FormControl('')

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
    this.api.getUserData().subscribe(userDatos => {
      this.userDatos = userDatos;

      this.userForm.patchValue({
        username: userDatos.username,
        email: userDatos.email,
        
        descriptionUser: userDatos.descriptionUser,
        birthday: userDatos.birthday,
        password:userDatos.password,
        cargo: userDatos.cargo,
        numCelular: userDatos.numCelular,
        direccion : userDatos.direccion
      })



      console.log(userDatos, 'datos del usuario')
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




  
 
 
  onUpdateUser() {
    if (this.userForm.valid) {
      const updatedData = this.userForm.value; // Obtener los datos actualizados del formulario

      // Llamar a la función de actualización del usuario
      this.api.updateUserData(updatedData).subscribe(updatedUser => {
        // Realizar acciones después de que los datos se hayan actualizado
        console.log(updatedUser)
        if(updatedData != null){
          const usuario = `${updatedData.username}`
          const notificacion = `Se ha realizado con éxito la actualización de ${usuario}`
          Swal.fire({
            icon:'success',
            title: 'Actualizar Datos',
            text: `Se ha realizado con éxito la actualización de ${usuario} `,
            confirmButtonText: 'Aceptar'
          }).then(() =>{

            this.notificacionesService.agregarNotificacion(notificacion,'green-bg')
            this.router.navigate(['usuarioPanel'])
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
       this.userForm.value.fotoUser = e.target.result;
     };
     reader.readAsDataURL(file);
  }
  
}

