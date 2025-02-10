import { Component } from '@angular/core';
import {IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitasMedicasService } from '../services/citas-medicas.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonTitle, IonToolbar, IonHeader, CommonModule, FormsModule, IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent],
})
export class HomePage {

  citas: any[] = [];
  paciente: string = '';
  fecha: string = '';
  especialidadId: number | null = null;
  especialidades: any[] = [];
  citaSeleccionada: any = null;
  constructor(private citaService:CitasMedicasService) { }

  ngOnInit() {
    this.cargarCitas();
    this.cargarEspecialidades();
  }
  // Carga todas las especialidades
  cargarEspecialidades() {
    this.citaService.getEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
        console.log('Especialidades cargadas:', this.especialidades);
      },
      error: (error) => {
        console.error('Error al cargar especialidades:', error);
      }
    });
  }
  // Cargar todas las citas
  cargarCitas() {
    this.citaService.getCitas().subscribe({
      next: (data) => {
        this.citas = data;
      },
      error: (error) => {
        console.error('Error al cargar citas:', error);
      }
    });
  }

  // Filtrar citas por fecha y especialidad
  filtrarCitas() {
    if (!this.fecha || !this.especialidadId) {
      console.error('Debe seleccionar una fecha y una especialidad');
      return;
    }

    this.citaService.getCitasFiltradas(this.fecha, this.especialidadId).subscribe({
      next: (data) => {
        this.citas = data;
      },
      error: (error) => {
        console.error('Error al filtrar citas:', error);
      }
    });
  }

  // Registrar nueva cita
  registrarCita() {
    if (!this.paciente || !this.fecha || !this.especialidadId) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    this.citaService.registerCita(this.paciente, this.fecha, this.especialidadId).subscribe({
      next: (data) => {
        console.log('Cita registrada:', data);
        this.cargarCitas(); 
      },
      error: (error) => {
        console.error('Error al registrar cita:', error);
      }
    });
  }



  seleccionarCita(cita: any) {
    this.citaSeleccionada = cita;
    this.paciente = cita.paciente;
    this.fecha = cita.fecha;
    this.especialidadId = cita.especialidadId;
  }

  //  Editar cita seleccionada
  editarCita() {
    if (!this.citaSeleccionada) {
      console.error('No hay cita seleccionada para editar');
      return;
    }

    this.citaService.updateCita(this.citaSeleccionada.id, this.paciente, this.fecha, this.especialidadId!).subscribe({
      next: (data) => {
        console.log('Cita actualizada:', data);
        this.cargarCitas();
        this.citaSeleccionada = null; // Limpiar selección
      },
      error: (error) => {
        console.error('Error al actualizar cita:', error);
      }
    });
  }
}
