import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuideService } from 'src/app/Service/guia.service';
import { Guia } from 'src/models/guia';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.page.html',
  styleUrls: ['./guia.page.scss'],
})
export class GuiaPage implements OnInit {
  idGuia: number | undefined;
  guia: Guia | undefined;
  frases: string[] = []; // Frases separadas por puntos

  constructor(
    private route: ActivatedRoute,
    private guideService: GuideService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('Id');
    if (id) {
      this.idGuia = +id;
      this.cargarGuia(this.idGuia);
    }
  }

  cargarGuia(id: number) {
    this.guideService.getGuideById(id).subscribe(
      (data: Guia) => {
        this.guia = data;
        this.frases = this.procesarFrases(this.guia.detalle || '');
      },
      (error) => {
        console.error('Error al cargar guía:', error);
      }
    );
  }

  procesarFrases(detalle: string): string[] {
    return detalle
      .split(/(?<!\d)\. /) // Divide por puntos seguidos de un espacio, excepto números
      .map((frase) => frase.trim()) // Limpia espacios innecesarios
      .filter((frase) => frase !== '') // Filtra frases vacías
      .map((frase) => (frase.endsWith('.') ? frase : `${frase}.`)); // Asegura puntos al final
  }
}
