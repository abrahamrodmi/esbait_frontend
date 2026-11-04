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
  resultado: any = null;
  cargando: boolean = false;
  errorMensaje: string = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  analizarCorreo() {
    if (!this.textoCorreo.trim()) return;

    this.cargando = true;
    this.errorMensaje = '';
    this.resultado = null;
    this.cdr.detectChanges();

    this.http.post(this.apiUrl, { texto: this.textoCorreo }).subscribe({
      next: (respuesta) => {
        this.resultado = respuesta;
        this.cargando = false;
        this.cdr.detectChanges();
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
    this.textoCorreo = 'Su cuenta será suspendida. Verifique sus datos inmediatamente mediante el siguiente enlace http://verificacion-urgente.com';
    this.cdr.detectChanges();
  }
}
