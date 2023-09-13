import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/75Adicionales/751Service/api.service';
import { DetallesPacienteI, listaResidentesI } from 'src/app/75Adicionales/Models/2Residentes/Residentes.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-residentes',
  templateUrl: './detalles-residentes.component.html',
  styleUrls: ['./detalles-residentes.component.css']
})
export class DetallesResidentesComponent implements OnInit {

  pacientes:listaResidentesI[] =[];
  pacienteDetalles:DetallesPacienteI | undefined;
  

  constructor( private router:Router, private api:ApiService, private activaterouter: ActivatedRoute){
    
  }


  ngOnInit(): void {
    const residenteId = this.activaterouter.snapshot.params['id']; // Obtén el ID del residente desde los parámetros de la URL

    if (residenteId) {
      // Si tienes un ID, establece el pacienteID en tu servicio
      this.api.setPacienteID(residenteId);

      // Realiza la solicitud para obtener los detalles del residente
      this.api.getResidenteDetails().subscribe((pacienteDetalles) => {
        this.pacienteDetalles = pacienteDetalles;
        console.log(this.pacienteDetalles, 'hola');
      });
    } else {
      console.log('No se encontró un ID de residente en los parámetros de la URL');
      // Puedes manejar esto según tus necesidades, por ejemplo, redirigir a una página de error
    }
  }



  OnUpdateResident(pacienteID: listaResidentesI['id']){
    this.api.setPacienteID(pacienteID)
    this.router.navigate(['updateResidente',pacienteID])
  }




  OnDeleteResident(){
    
    if (this.pacienteDetalles){
      const NombreCompleto = `${this.pacienteDetalles.nombreResidente} ${this.pacienteDetalles.apellidoResidente}`
      
      
      Swal.fire({
        icon:'error',
        title:'Eliminar Residente',
        text:`Está seguro que desea eliminar a ${NombreCompleto} `,
        showCancelButton: true,
        confirmButtonText: `Sí`,
        cancelButtonText: `Cancelar`,
        allowOutsideClick: () => !Swal.isLoading() // Evita que se cierre haciendo clic afuera mientras se está procesando
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.pacienteDetalles) {
            let datos: DetallesPacienteI = this.pacienteDetalles;
            this.api.deleteResident(datos).subscribe((data) => {
              console.log(data);
              this.router.navigate(['']);
            });
          }
        }
      });
    }
  }
}
//Este código utiliza el método setPacienteID(id: any) en tu servicio para establecer el pacienteID antes de realizar la solicitud getResidenteDetails(). Además, obtiene el residenteId de los parámetros de la URL usando this.activatedRoute.snapshot.params.id. Si no se encuentra un ID en la URL, puedes manejarlo según tus necesidades, como redirigir a una página de error o realizar otra acción específica para tu aplicación.





