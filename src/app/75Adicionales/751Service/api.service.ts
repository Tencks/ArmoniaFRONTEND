import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, tap} from 'rxjs';
import { DetallesPacienteI, listaResidentesI, loadResidentesI } from '../Models/2Residentes/Residentes.interface';
import { LoadMedicamentoI, listaMedicamentosI } from '../Models/4Medicamentos/Medicamentos.interface';
import { LoadSemanalOI, listaSemanalOI } from '../Models/3Medico/ObservacionesSemanal.interface';
import { LoadMedicamentoLocalI, getLocalDataI, getUserDataI, listaMedicamentosLocalI } from '../Models/5Armonia/DatosArmonia.interface';
import { LoginI, RegisterI, ResponseI, TokenI } from '../Models/1LoginRegister/login.interface';
import { LoadCuracionI, listaCuracionesI } from '../Models/3Medico/Curaciones.interface';
import { NotificacionesServiceService } from './752NotificacionesService/notificaciones-service.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private urlApi =  'http://127.0.0.1:8000/api/';
  private pacienteID: DetallesPacienteI[] = [];
  private userID : getUserDataI[] =[];

  constructor(private http: HttpClient, private notificaionesService: NotificacionesServiceService) {  }


RegisterUser(form:RegisterI):Observable<RegisterI>{
  let direccion = this.urlApi + "addUser/"
  return this.http.post<RegisterI>(direccion,form)
}

 loginByEmail(form:LoginI):Observable<ResponseI> {
  let direccion = this.urlApi + "login/"
  return this.http.post<ResponseI>(direccion,form);
 }

Logout(form:TokenI):Observable<TokenI>{
  let direccion = this.urlApi + "logout/"
  return this.http.post<TokenI>(direccion,form);
}








// RESIDENTES METODOS ALL 


getAllResidents(): Observable<listaResidentesI[]>{
  let direccion = this.urlApi + "residentes/"
  return this.http.get<listaResidentesI[]>(direccion);
}


setPacienteID(id : any){
  this.pacienteID = id;
}

getResidenteDetails():Observable<DetallesPacienteI>{
  let direccion = this.urlApi + "residentes/" + this.pacienteID
  return this.http.get<DetallesPacienteI>(direccion);
}

loadResident(form:loadResidentesI):Observable<loadResidentesI>{
  let direccion = this.urlApi + "residentes/"
  return this.http.post<loadResidentesI>(direccion,form);
}

deleteResident(form:DetallesPacienteI):Observable<ResponseI>{
  let direccion = this.urlApi + "residentes/" + this.pacienteID
  let Options = {
    headers : new HttpHeaders({
      'Content-type':'aplication/json'
    }),
    body:form
  }
  return this.http.delete<ResponseI>(direccion,Options)
}

updateResident(updateData:any): Observable<any>{
let direccion = this.urlApi + "residentes/" + this.pacienteID + "/"


return this.http.put<any>(direccion, updateData)
}











//# METODO PARA CREAR UN NUEVO MEDICAMENTO

LoadNewMedicamento(form:LoadMedicamentoI):Observable<LoadMedicamentoI>{
  let direccion = this.urlApi + "medicamentosresidente/"
  return this.http.post<LoadMedicamentoI>(direccion,form)
}


//# METODO PARA MOSTRAR TODOS LOS MEDICAMENTOS


getMedicamentos():Observable<listaMedicamentosI>{
  let direccion = this.urlApi + "residentes/" + this.pacienteID + "/" + "medicamentos/"
  return this.http.get<listaMedicamentosI>(direccion);
}


//# METODOS PARA LAS OBSERVACIONES SEMANALES

LoadNewSemanalO(form:LoadSemanalOI):Observable<LoadSemanalOI>{
  let direccion = this.urlApi + "observacionessemanales/"
  return this.http.post<LoadSemanalOI>(direccion,form)
}

//# METODO PARA MOSTRAR 
getSemanalO():Observable<listaSemanalOI>{
  let direccion = this.urlApi + "residentes/" + this.pacienteID + "/" + "signosVitales/"
  return this.http.get<listaSemanalOI>(direccion);
}


//# METODOS PARA LAS CURACIONES

LoadNewCuracion(form:LoadCuracionI):Observable<LoadCuracionI>{
  let direccion = this.urlApi + "curaciones/"
  return this.http.post<LoadCuracionI>(direccion,form)
}

//# METODO PARA MOSTRAR 
getCuracion():Observable<listaCuracionesI>{
  let direccion = this.urlApi + "residentes/" + this.pacienteID + "/" + "curaciones/"
  return this.http.get<listaCuracionesI>(direccion);
}



//# METODOS DEL USUARIO

setuserID(id : any){
  this.userID = id;
}

getUserData():Observable<getUserDataI>{
  const userToken = localStorage.getItem('token');


  const headers = new HttpHeaders({
    'Authorization': `Bearer ${userToken}`
  })

  let direccion = this.urlApi + "userData/" + this.userID + "/"
  return this.http.get<getUserDataI>(direccion, {headers})
}

//$ UPDATE 
updateUserData(updatedData: any): Observable<any> {
  const userToken = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${userToken}`
  });

  const direccion = this.urlApi + "userData/" + this.userID + "/"

  return this.http.put<any>(direccion, updatedData, { headers });
}




//# METODOS PARA EL STOCK LOCAL, LLAMAR AL LOCAL Y ESO

getLocalData():Observable<getLocalDataI>{

  let direccion = this.urlApi + "local/1/"
  return this.http.get<getLocalDataI>(direccion)
}

updateLocalData(updatedData: any):Observable<any>{

  let direccion = this.urlApi + "local/1/"
  return this.http.put<any>(direccion,updatedData)
}

loadNewMedicacionLocal(form:LoadMedicamentoLocalI):Observable<LoadMedicamentoLocalI>{
let direccion = this.urlApi + 'medicamentoslocales/'
 return this.http.post<LoadMedicamentoLocalI>(direccion,form)

}

getMedicationLocal():Observable <listaMedicamentosLocalI>{
  let direccion = this.urlApi + 'local/1/localMedicamentos/'
  return this.http.get<listaMedicamentosLocalI>(direccion)
}




// CHECKS PARA SABER QUE MEDICAMENTOS HACEN FALTA EN RESIDENTES Y EN EL LOCAL
checkMedicationResidenteStatus(): void {


  const notificacionesGeneradas = new Set<string>();

 // Realiza una solicitud para obtener la lista de residentes
 this.http.get<any[]>(this.urlApi + 'residentes/').subscribe((residentes) => {
  for (const residente of residentes) {
    // Construye la URL de la solicitud para cada residente
    const direccion = `${this.urlApi}residentes/${residente.id}/medicamentos/status`;

    // Realiza la solicitud para el residente actual
    this.http.get<any[]>(direccion).subscribe((data) => {
      console.log(data);




    // Iteramos a travez de cada medicamento del array
    for (const medicamento of data){
      if (medicamento.lowMedication || medicamento.lessThanAWeek) {
        
        console.log(medicamento);

        const ResidenteNombre = `${medicamento.residente}`;
        const Medicamento = `${medicamento.medicamento}`;
        const Agotado = `${medicamento.fechaAgotamiento}`;

        const notificacion = `Advertencia: A ${ResidenteNombre} se le agotará el medicamento: ${Medicamento} el día ${Agotado}`;

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
  let direccion = this.urlApi + 'local/1/localMedicamentos/status';

  this.http.get<any[]>(direccion).subscribe((data) => {
    console.log(data)


    // Iteramos a travez de cada medicamento del array
    for (const medicamentoLocal of data){
      if (medicamentoLocal.lowMedication || medicamentoLocal.lessThanAWeek) {
        
        console.log(medicamentoLocal);

        const Local = `${medicamentoLocal.local}`;
        const Medicamento = `${medicamentoLocal.medicamento}`;
        const Agotado = `${medicamentoLocal.fechaAgotamiento}`;

        const notificacion = `Advertencia: En las reservas de ${Local} se está por agotar el medicamento: ${Medicamento} el día ${Agotado}`;

        this.notificaionesService.agregarNotificacion(notificacion,'red-bg')

      }
    }
    
  });
}









}
