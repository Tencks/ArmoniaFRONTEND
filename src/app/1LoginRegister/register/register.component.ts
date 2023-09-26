import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { CARGO } from 'src/app/75Adicionales/Models/10Tulpas/Tulpa.const';
import { RegisterI, listaUsersDataI } from 'src/app/75Adicionales/Models/1LoginRegister/login.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuariosCreados: boolean = false;

  cargoClass = CARGO;

  RegisterForm = new FormGroup({
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/), // Al menos 1 minúscula, 1 mayúscula y 1 número
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
    ]),
    cargo: new FormControl('0', Validators.required)
  });


  errorStatus:boolean = false;
  errorMsj:any ='';


constructor(private api:ApiService, private router:Router){}






  ngOnInit(): void {
      
 // Llamar al método getUsersData para verificar si existen usuarios
 this.api.getUsersData().subscribe(
  (usuarios: listaUsersDataI[]) => {
    // Si se devuelven usuarios, establecer usuariosCreados en true
    if (usuarios && usuarios.length > 0) {
      this.usuariosCreados = true;
    }
  }
 )
  }

  
  OnRegister(form: RegisterI){
  // Verificar si form.password no es nulo ni indefinido antes de realizar la validación
  if (form.password && form.confirmPassword) {
    // Verificar si las contraseñas cumplen con los requisitos
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    const isPasswordValid =
      form.password.length >= 8 && passwordPattern.test(form.password.toString());

    if (!isPasswordValid) {
      // Contraseña no cumple con los requisitos, mostrar mensaje de error
      this.errorStatus = true;
      this.errorMsj =
        'La contraseña debe tener al menos 8 caracteres y contener al menos 1 letra mayúscula, 1 letra minúscula y 1 número.';
      return; // Detener el proceso de registro
    }

    // Verificar si las contraseñas coinciden
    if (form.password !== form.confirmPassword) {
      // Contraseñas no coinciden, mostrar mensaje de error
      this.errorStatus = true;
      this.errorMsj = 'Las contraseñas no coinciden.';
      return; // Detener el proceso de registro
    }
  } else {
    // form.password o form.confirmPassword es nulo o indefinido, mostrar mensaje de error
    this.errorStatus = true;
    this.errorMsj = 'Por favor, ingrese una contraseña y una confirmación de contraseña válidas.';
    return; // Detener el proceso de registro
  }



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
    
  );
}
}