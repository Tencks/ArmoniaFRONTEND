import { Component, OnInit } from '@angular/core';
import { NotificacionesServiceService } from '../../751Service/752NotificacionesService/notificaciones-service.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit{

  notificaciones:{ mensaje: string;estilo:string, abierta: boolean }[] = [];

  constructor(private notificacionesService: NotificacionesServiceService) {}

ngOnInit(): void {
  // Obtener las notificaciones del servicio
  this.notificaciones = this.notificacionesService.getNotificaciones();
}

cerrarNotificacion(index: number) {
  this.notificacionesService.borrarNotificacion(index);
}
}
