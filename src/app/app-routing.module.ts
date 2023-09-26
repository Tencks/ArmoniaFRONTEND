import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './1LoginRegister/login/login.component';
import { RegisterComponent } from './1LoginRegister/register/register.component';
import { HomeResidentesComponent } from './2Residentes/home-residentes/home-residentes.component';
import { DetallesResidentesComponent } from './2Residentes/detalles-residentes/detalles-residentes.component';
import { LoadResidenteComponent } from './2Residentes/load-residente/load-residente.component';
import { HomeMedicoComponent } from './3HistorialMedico/home-medico/home-medico.component';
import { DetallesMedicoComponent } from './3HistorialMedico/detalles-medico/detalles-medico.component';
import { HomeMedicamentosComponent } from './4MedicamentosResidentes/home-medicamentos/home-medicamentos.component';
import { DetallesMedicamentosComponent } from './4MedicamentosResidentes/detalles-medicamentos/detalles-medicamentos.component';
import { LoadMedicamentoComponent } from './4MedicamentosResidentes/44Medicamentos/load-medicamento/load-medicamento.component';
import { ObservacionesMedicoComponent } from './3HistorialMedico/33ObservacionesMedico/observaciones-medico/observaciones-medico.component';
import { LoadObservacionesMedicoComponent } from './3HistorialMedico/33ObservacionesMedico/load-observaciones-medico/load-observaciones-medico.component';
import { LoadCuracionesMedicoComponent } from './3HistorialMedico/333CuracionesMedico/load-curaciones-medico/load-curaciones-medico.component';
import { CuracionesMedicoComponent } from './3HistorialMedico/333CuracionesMedico/curaciones-medico/curaciones-medico.component';
import { HomeDetallesUsuarioComponent } from './6UsuarioPanel/home-detalles-usuario/home-detalles-usuario.component';
import { HomeDetallesMedicamentosComponent } from './5MedicamentosArmonia/home-detalles-medicamentos/home-detalles-medicamentos.component';
import { LoadMedicamentosArmoniaComponent } from './5MedicamentosArmonia/55Medicamentos/load-medicamentos-armonia/load-medicamentos-armonia.component';
import { DetallesUpdateComponent } from './6UsuarioPanel/detalles-update/detalles-update.component';
import { ArmoniaUpdateComponent } from './5MedicamentosArmonia/armonia-update/armonia-update.component';
import { UpdateResidenteComponent } from './2Residentes/update-residente/update-residente.component';
import { PermisosPanelComponent } from './6UsuarioPanel/permisos-panel/permisos-panel.component';
import { HomeEgresadosComponent } from './2Residentes/22Egresos/home-egresados/home-egresados.component';
import { DetallesEgresadosComponent } from './2Residentes/22Egresos/detalles-egresados/detalles-egresados.component';





// LOGICA DEL RUTEO DE LA APP
const routes: Routes = [
  // LOGIN
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register', component:RegisterComponent},
  {path:'login', component: LoginComponent},

  // RESIDENTES
  {path:'homeResidentes', component: HomeResidentesComponent },
  {path:'detallesResidentes/:id',component:DetallesResidentesComponent },
  {path:'updateResidente/:id', component:UpdateResidenteComponent },
  {path:'loadResidente',component: LoadResidenteComponent},


  //EGRESADOS DE RESIDENTES
  {path:'homeEgresados', component: HomeEgresadosComponent },
  {path:'detallesEgresados/:id',component:DetallesEgresadosComponent },
  

  // PARTE MEDICA
  {path:'homeMedico',component:HomeMedicoComponent },
  {path:'detallesMedicos/:id',component:DetallesMedicoComponent },

  // MEDICAMENTOS DEL RESIDENTE
  {path:'homeMedicamentos',component:HomeMedicamentosComponent },
  {path:'detallesMedicamentos/:id',component:DetallesMedicamentosComponent },
  {path:'loadMedicamento',component:LoadMedicamentoComponent },
  
  // OBSERVACIONES SEMANALES
  {path:'loadObservación',component:LoadObservacionesMedicoComponent },
  {path:'viewObservación/:id',component:ObservacionesMedicoComponent },
  
  // CURACIONES
  {path:'loadCuración',component:LoadCuracionesMedicoComponent },
  {path:'viewCuración/:id',component:CuracionesMedicoComponent },

// MEDICAMENTOS DE ARMONIA
  {path:'homeArmonia', component:HomeDetallesMedicamentosComponent },
  {path:'UpdateArmonia', component:ArmoniaUpdateComponent },
  {path:'loadMedicamentosArmonia',component:LoadMedicamentosArmoniaComponent },

  // PANEL DEL USUARIO CONECTADO
  {path:'usuarioPanel',component:HomeDetallesUsuarioComponent },
  {path:'UpdateUser', component:DetallesUpdateComponent },
  {path:'PermisosPanel', component:PermisosPanelComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
