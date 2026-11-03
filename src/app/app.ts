import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private apiUrl = 'https://esbait.onrender.com/api/analizar';

  textoCorreo: string = '';
  resultadoJson: any = null;
  cargando: boolean = false;
  errorMensaje: string = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  analizarCorreo() {
    if (!this.textoCorreo.trim()) return;

    this.cargando = true;
    this.errorMensaje = '';
    this.resultadoJson = null;
    this.cdr.detectChanges(); // Actualiza el botón a "Analizando..."

    this.http.post(this.apiUrl, { texto: this.textoCorreo }).subscribe({
      next: (respuesta) => {
        console.log('Respuesta recibida:', respuesta);
        this.resultadoJson = respuesta;
        this.cargando = false;
        this.cdr.detectChanges(); // <-- Esto fuerza a que el JSON aparezca debajo de los botones al instante
      },
      error: (err) => {
        this.errorMensaje = 'Error al conectar con el servidor.';
        console.error(err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  cargarEjemploPhishing() {
    this.textoCorreo = 'Su cuenta será suspendida. Verifique sus datos inmediatamente mediante el siguiente enlace.';
    this.cdr.detectChanges();
  }
}
