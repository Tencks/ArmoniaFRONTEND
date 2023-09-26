import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { TokenI } from 'src/app/75Adicionales/Models/1LoginRegister/login.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
      
  }
  
  
  CreateResidenteGO(){
    this.router.navigate(['loadResidente'])
  }
  
  CreateMedicamentoGO(){
    this.router.navigate(['loadMedicamento'])
  }
  
  HomeResidenteGO(){
    this.router.navigate([''])
  }
  
  HomeMedicoGO(){
    this.router.navigate(['homeMedico'])
  }
  
  HomeMedicamentosGO(){
    this.router.navigate(['homeMedicamentos'])
  
  }
  
  HomeMedicamentoLocalGO(){
    this.router.navigate(['homeArmonia'])
  
  }
  HomeUsuarioGO(){
    this.router.navigate(['usuarioPanel'])
  
  }
  HomeEgresadosGO(){
    this.router.navigate(['homeEgresados'])
  
  }
  
  
  
  onLogout() {
    const token = localStorage.getItem("token"); // Obtener el token del localStorage
  
    if (token) {
      this.api.Logout({ token: token }).subscribe(data => {
        console.log(data);
        let tokenResponse: TokenI = data;
        console.log(tokenResponse);
  
        // Eliminar el token del localStorage después del cierre de sesión
        localStorage.removeItem("token");
        this.router.navigate(['']);
      });
    }
  }

  hayNotificacionesEnLocalStorage(): boolean {
    const notificacionesStr = localStorage.getItem('notificaciones');
    return notificacionesStr ? JSON.parse(notificacionesStr).length > 0 : false;
  }
}

 
  