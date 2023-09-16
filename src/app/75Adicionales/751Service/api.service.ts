import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, tap} from 'rxjs';
import { DetallesPacienteI, listaResidentesI, loadResidentesI } from '../Models/2Residentes/Residentes.interface';
import { LoadMedicamentoI, listaMedicamentosI } from '../Models/4Medicamentos/Medicamentos.interface';
import { LoadSemanalOI, listaSemanalOI } from '../Models/3Medico/ObservacionesSemanal.interface';
import { LoadMedicamentoLocalI, getLocalDataI, getUserDataI, listaMedicamentosLocalI } from '../Models/5Armonia/DatosArmonia.interface';
import { LoginI, RegisterI, ResponseI, TokenI, listaUsersDataI } from '../Models/1LoginRegister/login.interface';
import { LoadCuracionI, listaCuracionesI } from '../Models/3Medico/Curaciones.interface';
import { NotificacionesServiceService } from './752NotificacionesService/notificaciones-service.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private urlApi =  'https://drf-testeando-para-practicas.onrender.com/api/';
  private pacienteID: DetallesPacienteI[] = [];
  private userID : getUserDataI[] =[];
  private medicamentoID : LoadMedicamentoI[] =[];


  

  constructor(private http: HttpClient, private notificaionesService: NotificacionesServiceService) {  }







RegisterUser(form:RegisterI):Observable<RegisterI>{
  let direccion = this.urlApi + "addUser/"
  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };
  return this.http.post<RegisterI>(direccion,form,httpOptions)
}

 loginByEmail(form:LoginI):Observable<ResponseI> {
  let direccion = this.urlApi + "login/"
  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };
  return this.http.post<ResponseI>(direccion,form,httpOptions);
 }

Logout(form:TokenI):Observable<TokenI>{
  let direccion = this.urlApi + "logout/"
  
  return this.http.post<TokenI>(direccion,form);
}








// RESIDENTES METODOS ALL 


getAllResidents(): Observable<listaResidentesI[]>{
  let direccion = this.urlApi + "residentes/"
  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };
  return this.http.get<listaResidentesI[]>(direccion,httpOptions);
}


setPacienteID(id : any){
  this.pacienteID = id;
}

getResidenteDetails():Observable<DetallesPacienteI>{
  let direccion = this.urlApi + "residentes/" + this.pacienteID
  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };
  return this.http.get<DetallesPacienteI>(direccion,httpOptions);
}

loadResident(form:loadResidentesI):Observable<loadResidentesI>{
  let direccion = this.urlApi + "residentes/"
  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };
  return this.http.post<loadResidentesI>(direccion,form,httpOptions);
}

deleteResident(form:DetallesPacienteI):Observable<ResponseI>{
  let direccion = this.urlApi + "residentes/" + this.pacienteID
  let Options = {
    headers : new HttpHeaders({
      'Content-type':'aplication/json',
      'Origin': 'http://www.whitenoiseland.com.ar'

    }),
    body:form
  }
  return this.http.delete<ResponseI>(direccion,Options)
}

updateResident(updateData:any): Observable<any>{
let direccion = this.urlApi + "residentes/" + this.pacienteID + "/"
// Crear cabeceras CORS
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
  })
};

return this.http.put<any>(direccion, updateData,httpOptions)
}











//# METODO PARA CREAR UN NUEVO MEDICAMENTO

LoadNewMedicamento(form:LoadMedicamentoI):Observable<LoadMedicamentoI>{
  let direccion = this.urlApi + "medicamentosresidente/"
  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };
  return this.http.post<LoadMedicamentoI>(direccion,form,httpOptions)
}


//# METODO PARA MOSTRAR TODOS LOS MEDICAMENTOS


getMedicamentos():Observable<listaMedicamentosI>{
  let direccion = this.urlApi + "residentes/" + this.pacienteID + "/" + "medicamentos/"
  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };
  return this.http.get<listaMedicamentosI>(direccion,httpOptions);
}

//# METODOS PARA EDITAR Y ELIMINAR UN MEDICAMENTO

setMedicamentoID(id : any){
  this.medicamentoID = id;
}


UpdateMedicamento(updatedData: any):Observable<any>{
  let direccion = this.urlApi + "medicamentosresidente/" + this.medicamentoID + "/"
  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };

  return this.http.put<any>(direccion, updatedData,httpOptions);
}

DeleteMedicamento(form:listaMedicamentosI):Observable<ResponseI>{
  let direccion = this.urlApi + "medicamentosresidente/" + this.medicamentoID + "/" 
  let Options = {
    headers : new HttpHeaders({
      'Content-type':'aplication/json',
      'Origin' : 'http://www.whitenoiseland.com.ar'
    }),
    body:form
  }
  return this.http.delete<ResponseI>(direccion,Options)
}






//# METODOS PARA LAS OBSERVACIONES SEMANALES

LoadNewSemanalO(form:LoadSemanalOI):Observable<LoadSemanalOI>{
  let direccion = this.urlApi + "observacionessemanales/"
  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };
  return this.http.post<LoadSemanalOI>(direccion,form,httpOptions)
}

//# METODO PARA MOSTRAR 
getSemanalO():Observable<listaSemanalOI>{
  let direccion = this.urlApi + "residentes/" + this.pacienteID + "/" + "signosVitales/"
  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };
  return this.http.get<listaSemanalOI>(direccion,httpOptions);
}


//# METODOS PARA LAS CURACIONES

LoadNewCuracion(form:LoadCuracionI):Observable<LoadCuracionI>{
  let direccion = this.urlApi + "curaciones/"
  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };
  return this.http.post<LoadCuracionI>(direccion,form,httpOptions)
}

//# METODO PARA MOSTRAR 
getCuracion():Observable<listaCuracionesI>{
  let direccion = this.urlApi + "residentes/" + this.pacienteID + "/" + "curaciones/"
  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };
  return this.http.get<listaCuracionesI>(direccion,httpOptions);
}



//# METODOS DEL USUARIO

setuserID(id : any){
  this.userID = id;
}

getUserData():Observable<getUserDataI>{
  const userToken = localStorage.getItem('token');


  const headers = new HttpHeaders({
    'Authorization': `Bearer ${userToken}`,
    'Content-Type' : 'application/json',
    'Origin' : 'hhtp://www.whitenoiseland.com.ar'
  })

  let direccion = this.urlApi + "userData/" + this.userID + "/"
  return this.http.get<getUserDataI>(direccion, {headers})
}

//$ UPDATE 
updateUserData(updatedData: any): Observable<any> {
  const userToken = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${userToken}`,
    'Content-Type' : 'application/json',
    'Origin' : 'hhtp://www.whitenoiseland.com.ar'
  });

  const direccion = this.urlApi + "userData/" + this.userID + "/"

  return this.http.put<any>(direccion, updatedData, { headers });
}

getUsersData():Observable<listaUsersDataI[]>{
  let direccion = this.urlApi + "userData/"
    // Crear cabeceras CORS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
      })
    };
  return this.http.get<listaUsersDataI[]>(direccion,httpOptions)
}

UpdateUsersData(updatedData: any):Observable<any>{
  let direccion = this.urlApi + "userData/" + this.userID + "/"
    // Crear cabeceras CORS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
      })
    };
  return this.http.put<any>(direccion,updatedData,httpOptions)
}

DeleteUser(form:getUserDataI):Observable<ResponseI>{
  let direccion = this.urlApi + "userData/" + this.userID + "/"
  let Options = {
    headers : new HttpHeaders({
      'Content-type':'aplication/json',
      'Origin':'http://www.whitenoiseland.com.ar'
    }),
    body:form
  }
    return this.http.delete<ResponseI>(direccion,Options)
}







//# METODOS PARA EL STOCK LOCAL, LLAMAR AL LOCAL Y ESO

getLocalData():Observable<getLocalDataI>{

  let direccion = this.urlApi + "local/1/"
    // Crear cabeceras CORS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
      })
    };
  return this.http.get<getLocalDataI>(direccion,httpOptions)
}

updateLocalData(updatedData: any):Observable<any>{

  let direccion = this.urlApi + "local/1/"
    // Crear cabeceras CORS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
      })
    };
  return this.http.put<any>(direccion,updatedData,httpOptions)
}

loadNewMedicacionLocal(form:LoadMedicamentoLocalI):Observable<LoadMedicamentoLocalI>{
let direccion = this.urlApi + 'medicamentoslocales/'
  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };
 return this.http.post<LoadMedicamentoLocalI>(direccion,form,httpOptions)

}

getMedicationLocal():Observable <listaMedicamentosLocalI>{
  let direccion = this.urlApi + 'local/1/localMedicamentos/'
    // Crear cabeceras CORS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
      })
    };
  return this.http.get<listaMedicamentosLocalI>(direccion,httpOptions)
}

UpdateMedicamentoLocal(updatedData: any):Observable<any>{
  let direccion = this.urlApi + 'medicamentoslocales/' + this.medicamentoID + "/"
    // Crear cabeceras CORS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
      })
    };

  return this.http.put<any>(direccion, updatedData,httpOptions);
}
DeleteMedicametoLocal(form:LoadMedicamentoLocalI):Observable<ResponseI>{
  let direccion = this.urlApi + 'medicamentoslocales/' + this.medicamentoID + "/"
  let Options = {
    headers : new HttpHeaders({
      'Content-type':'aplication/json',
      'Origin' : 'http://www.whitenoiseland.com.ar'
    }),
    body:form
  }
  return this.http.delete<ResponseI>(direccion,Options)
}






// CHECKS PARA SABER QUE MEDICAMENTOS HACEN FALTA EN RESIDENTES Y EN EL LOCAL
checkMedicationResidenteStatus(): void {

  const notificacionesGeneradas = new Set<string>();


  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };




 // Realiza una solicitud para obtener la lista de residentes
 this.http.get<any[]>(this.urlApi + 'residentes/').subscribe((residentes) => {
  for (const residente of residentes) {
    // Construye la URL de la solicitud para cada residente
    const direccion = `${this.urlApi}residentes/${residente.id}/medicamentos/status`;

    // Realiza la solicitud para el residente actual
    this.http.get<any[]>(direccion,httpOptions).subscribe((data) => {
      console.log(data);




    // Iteramos a travez de cada medicamento del array
    for (const medicamento of data){
      if (medicamento.lowMedication || medicamento.lessThanAWeek) {
        
        console.log(medicamento);

        const ResidenteNombre = `${medicamento.residente}`;
        const Medicamento = `${medicamento.medicamento}`;
        const Agotado = `${medicamento.fechaAgotamiento}`;

        const notificacion = `Advertencia: A ${ResidenteNombre} se le agotará el medicamento: ${Medicamento} a partir del día ${Agotado}`;

       // Verificar si esta notificación ya se generó
            const notificacionKey = `${ResidenteNombre}-${Medicamento}`;
            if (!notificacionesGeneradas.has(notificacionKey)) {
              this.notificaionesService.agregarNotificacion(notificacion, 'red-bg');
              notificacionesGeneradas.add(notificacionKey); // Agregar la notificación al conjunto
            }

      }
    }
    
  });
}
  });
}

checkMedicationLocalStatus(): void {


  // Crear cabeceras CORS
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'http://www.whitenoiseland.com.ar' // Agregar tu origen aquí
    })
  };




  let direccion = this.urlApi + 'local/1/localMedicamentos/status';

  this.http.get<any[]>(direccion,httpOptions).subscribe((data) => {
    console.log(data)


    // Iteramos a travez de cada medicamento del array
    for (const medicamentoLocal of data){
      if (medicamentoLocal.lowMedication || medicamentoLocal.lessThanAWeek) {
        
        console.log(medicamentoLocal);

        const Local = `${medicamentoLocal.local}`;
        const Medicamento = `${medicamentoLocal.medicamento}`;
        const Agotado = `${medicamentoLocal.fechaAgotamiento}`;

        const notificacion = `Advertencia: En las reservas de ${Local} se está por agotar el medicamento: ${Medicamento} a partir del día ${Agotado}`;

        this.notificaionesService.agregarNotificacion(notificacion,'red-bg')

      }
    }
    
  });
}









}
