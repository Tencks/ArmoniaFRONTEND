import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatStepperModule } from '@angular/material/stepper'; // Importa el módulo de stepper
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa el módulo de form field
import { MatButtonModule } from '@angular/material/button'; // Importa el módulo de botón
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './0Navbar/navbar/navbar.component';
import { RegisterComponent } from './1LoginRegister/register/register.component';
import { LoginComponent } from './1LoginRegister/login/login.component';
import { HomeResidentesComponent } from './2Residentes/home-residentes/home-residentes.component';
import { DetallesResidentesComponent } from './2Residentes/detalles-residentes/detalles-residentes.component';
import { LoadResidenteComponent } from './2Residentes/load-residente/load-residente.component';
import { HomeMedicoComponent } from './3HistorialMedico/home-medico/home-medico.component';
import { DetallesMedicoComponent } from './3HistorialMedico/detalles-medico/detalles-medico.component';
import { ObservacionesMedicoComponent } from './3HistorialMedico/33ObservacionesMedico/observaciones-medico/observaciones-medico.component';
import { LoadObservacionesMedicoComponent } from './3HistorialMedico/33ObservacionesMedico/load-observaciones-medico/load-observaciones-medico.component';
import { HomeMedicamentosComponent } from './4MedicamentosResidentes/home-medicamentos/home-medicamentos.component';
import { DetallesMedicamentosComponent } from './4MedicamentosResidentes/detalles-medicamentos/detalles-medicamentos.component';
import { LoadMedicamentoComponent } from './4MedicamentosResidentes/44Medicamentos/load-medicamento/load-medicamento.component';
import { HomeDetallesMedicamentosComponent } from './5MedicamentosArmonia/home-detalles-medicamentos/home-detalles-medicamentos.component';
import { LoadMedicamentosArmoniaComponent } from './5MedicamentosArmonia/55Medicamentos/load-medicamentos-armonia/load-medicamentos-armonia.component';
import { HomeDetallesUsuarioComponent } from './6UsuarioPanel/home-detalles-usuario/home-detalles-usuario.component';
import { DetallesUpdateComponent } from './6UsuarioPanel/detalles-update/detalles-update.component';
import { BackButtonComponent } from './75Adicionales/back-button/back-button.component';
import { LoadCuracionesMedicoComponent } from './3HistorialMedico/333CuracionesMedico/load-curaciones-medico/load-curaciones-medico.component';
import { CuracionesMedicoComponent } from './3HistorialMedico/333CuracionesMedico/curaciones-medico/curaciones-medico.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificacionesComponent } from './75Adicionales/Notificaciones/notificaciones/notificaciones.component';
import { ArmoniaUpdateComponent } from './5MedicamentosArmonia/armonia-update/armonia-update.component';
import { UpdateResidenteComponent } from './2Residentes/update-residente/update-residente.component';
import { PermisosPanelComponent } from './6UsuarioPanel/permisos-panel/permisos-panel.component';
import { HomeEgresadosComponent } from './2Residentes/22Egresos/home-egresados/home-egresados.component';
import { DetallesEgresadosComponent } from './2Residentes/22Egresos/detalles-egresados/detalles-egresados.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeResidentesComponent,
    DetallesResidentesComponent,
    LoadResidenteComponent,
    HomeMedicoComponent,
    DetallesMedicoComponent,
    ObservacionesMedicoComponent,
    LoadObservacionesMedicoComponent,
    HomeMedicamentosComponent,
    DetallesMedicamentosComponent,
    LoadMedicamentoComponent,
    HomeDetallesMedicamentosComponent,
    LoadMedicamentosArmoniaComponent,
    HomeDetallesUsuarioComponent,
    DetallesUpdateComponent,
    BackButtonComponent,
    LoadCuracionesMedicoComponent,
    CuracionesMedicoComponent,
    NotificacionesComponent,
    ArmoniaUpdateComponent,
    UpdateResidenteComponent,
    PermisosPanelComponent,
    HomeEgresadosComponent,
    DetallesEgresadosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule, // Agrega ReactiveFormsModule
    MatStepperModule, // Agrega MatStepperModule
    MatFormFieldModule, // Agrega MatFormFieldModule
    MatButtonModule, // 

    [SweetAlert2Module.forRoot()],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
