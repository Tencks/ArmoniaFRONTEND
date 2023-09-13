import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesServiceService {

  private notificaciones:{ mensaje: string; estilo:string ; abierta: boolean, generadaPorCheck?: boolean; }[] = [];

  constructor() { 

      // Recuperar las notificaciones del almacenamiento local al iniciar la aplicación
      const storedNotificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
      this.notificaciones = storedNotificaciones;
  }

  getNotificaciones() {
    return this.notificaciones;
  }

  
  agregarNotificacion(mensaje: string, estilo:string, generadaPorCheck: boolean = false) {
    this.notificaciones.push({ mensaje,estilo, abierta: true, generadaPorCheck });
    this.actualizarAlmacenamientoLocal();
  }


  cerrarNotificacion(index: number) {
    if (index >= 0 && index < this.notificaciones.length) {
      this.notificaciones[index].abierta = false;
      this.actualizarAlmacenamientoLocal();
    }
  }

  private actualizarAlmacenamientoLocal() {
    // Guardar las notificaciones en el almacenamiento local
    localStorage.setItem('notificaciones', JSON.stringify(this.notificaciones));
  }

  borrarNotificacion(index: number) {
    if (index >= 0 && index < this.notificaciones.length) {
      // Eliminar la notificación del array
      this.notificaciones.splice(index, 1);
      // Actualizar el almacenamiento local después de eliminar
      this.actualizarAlmacenamientoLocal();
    }
  }

  borrarTodasLasNotificaciones() {
    this.notificaciones = this.notificaciones.filter(notificacion => !notificacion.generadaPorCheck);
    this.actualizarAlmacenamientoLocal();
  }
  



}

