import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { LoginI, ResponseI, TokenI } from 'src/app/75Adicionales/Models/1LoginRegister/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({

    user_id : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  })

  logoutButton = new FormGroup({
    token : new FormControl('', Validators.required)
  })




  constructor(private api:ApiService, private router:Router){}


  // MANEJADOR DE ERRORES DE INICIO DE SESION 
  errorMessages: { [key: string]: string } = {
    'non_field_errors': 'Credenciales incorrectas. Por favor, inténtelo de nuevo.',
    'other_error_key': 'Ocurrió un error desconocido. Inténtelo más tarde.',
    // Agrega aquí otros mensajes de error según tus necesidades
  };

  errorStatus:boolean = false;
  errorMsj:any ='';


  ngOnInit(): void {

    this.checkLocalStorage();
      
  }

  OnRegisterButton(){
    this.router.navigate(['register']);
  }

checkLocalStorage (){
  if (localStorage.getItem('token')){
    this.router.navigate(['homeResidentes'])
  }
}


  onLogin(form: LoginI) {
    this.api.loginByEmail(form).subscribe(data => {
      console.log(data);
      let dataResponse: ResponseI = data;
      console.log(dataResponse);
      if (dataResponse.token != null) {
        localStorage.setItem('token',dataResponse.token);  
        localStorage.setItem('cargo',dataResponse.cargo);
        localStorage.setItem('id',dataResponse.id);
        console.log("Login successful");
        this.api.checkMedicationResidenteStatus();
        this.api.checkMedicationLocalStatus();
        this.router.navigate(['homeResidentes']);
      } else {
        this.errorStatus = true;
        this.errorMsj = 'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
      }
    },
    (error) => {
      // Manejo de errores en caso de problemas de conexión, etc.
      this.errorStatus = true;
      if (error.status === 400) {
        // Mensaje de error específico para Bad Request (400)
        this.errorMsj = 'Verifique sus datos e inténtelo de nuevo.';
      } else {
        // Manejo de otros errores
        this.errorMsj = 'Ocurrió un error en la solicitud. Por favor, inténtelo más tarde.';
      }
    }
  );
}

 
  onLogout(form: TokenI){
    this.api.Logout(form).subscribe(data =>{
      console.log(data);
      let tokenResponse:TokenI = data;
      console.log(tokenResponse);
    })
  }
 

}