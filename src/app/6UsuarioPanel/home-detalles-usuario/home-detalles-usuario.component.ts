import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { TokenI } from 'src/app/75Adicionales/Models/1LoginRegister/login.interface';
import { getUserDataI, putUserDataI } from 'src/app/75Adicionales/Models/5Armonia/DatosArmonia.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-detalles-usuario',
  templateUrl: './home-detalles-usuario.component.html',
  styleUrls: ['./home-detalles-usuario.component.css']
})
export class HomeDetallesUsuarioComponent implements OnInit{

  userDatos:getUserDataI| undefined;
  putUserDatos:putUserDataI|undefined;
  userForm!: FormGroup;


  cargoUsuario: string|null = localStorage.getItem('cargo');


  constructor(private api:ApiService, private router:Router, private formBuilder: FormBuilder){

    this.userForm = this.formBuilder.group({
      username: new FormControl(''), // Puedes inicializar estos valores con los datos actuales del usuario
      email: [''],
      fotoUser: [''], 
      descriptionUser:[''],   // Puedes inicializar estos valores con los datos actuales del usuario
      password:[''],
      birthday:[''],
      cargo:[''],
      numCelular:[''],
      direccion: ['']
      // Otros campos del usuario
    });

     // Obtén el ID del usuario conectado al inicializar el componente
     const userID = localStorage.getItem('id');
    
     // Llama a la función para establecer el ID del usuario
     this.MoreInfo(userID);
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




  
  ngOnInit(): void {
      
    this.api.getUserData().subscribe(userDatos => {
      this.userDatos = userDatos;
      console.log(userDatos, 'datos del usuario')
    })

  }


  onLogout() {
    const token = localStorage.getItem("token"); // Obtener el token del localStorage
  
    if (token) {
      this.api.Logout({ token: token }).subscribe(data => {
        let tokenResponse: TokenI = data;
        console.log(tokenResponse);
  
        // Eliminar el token del localStorage después del cierre de sesión
        localStorage.removeItem("token");
        localStorage.removeItem("cargo");
        localStorage.removeItem("id");

        this.router.navigate(['']);
      });
    }
  }


  onUpdateDatos(){
    this.router.navigate(['UpdateUser'])
  }

  
VerPermisos(){
  this.router.navigate(['PermisosPanel'])
}




}
