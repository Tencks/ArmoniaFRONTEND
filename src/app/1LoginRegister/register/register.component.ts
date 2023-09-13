import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { CARGO } from 'src/app/75Adicionales/Models/10Tulpas/Tulpa.const';
import { RegisterI } from 'src/app/75Adicionales/Models/1LoginRegister/login.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  cargoClass = CARGO;

  RegisterForm = new FormGroup({

    email : new FormControl('',Validators.required),
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
    password1 : new FormControl('',Validators.required),
    cargo : new FormControl('',Validators.required),
    
  })

  errorStatus:boolean = false;
  errorMsj:any ='';


constructor(private api:ApiService, private router:Router){}






  ngOnInit(): void {
      
  }
  
  OnRegister(form: RegisterI){
    this.api.RegisterUser(form).subscribe(data =>{
      console.log(data);
      let dataRegister:RegisterI = data;
      if (dataRegister != null){
        
        Swal.fire(
          'Registro',
          'Has sigo registrado con éxito',
          'success',
          
        )

        this.router.navigate([''])
      }
    },
    (error) => {
      this.errorStatus = true;
      if (error.status === 400) {
        if (error.error && error.error.non_field_errors) {
          // Acceder a los mensajes de error personalizados
          const customErrors: string[] = error.error.non_field_errors;
          // Puedes usar customErrors como sea necesario, por ejemplo, mostrarlos en la interfaz
          this.errorMsj = customErrors[0]; // Mostrar el primer mensaje de error personalizado
        } else {
          // Manejo de otros errores como se mencionó anteriormente
          this.errorMsj = 'Hubo un problema con la solicitud. Verifique sus datos e inténtelo de nuevo.';
        }
      } else if (error.status === 500) {
        // Mensaje de error específico para Internal Server Error (500)
        this.errorMsj = 'Ocurrió un error en el servidor. Por favor, inténtelo más tarde.';
      } else if (error.status === 422) {
        // Mensaje de error específico para Unprocessable Entity (422)
        this.errorMsj = 'Los datos proporcionados no son válidos. Por favor, revise los campos.';
      } else {
        // Manejo de otros errores
        this.errorMsj = 'Ocurrió un error en la solicitud. Por favor, inténtelo más tarde.';
      }
    }
  );
}
}