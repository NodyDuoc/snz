import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GuideService } from 'src/app/Service/guia.service';
import { Guia } from 'src/models/guia';

@Component({
  selector: 'app-guias',
  templateUrl: './guias.page.html',
  styleUrls: ['./guias.page.scss'],
})
export class GuiasPage implements OnInit {
  guias: (Guia & { titulo: string })[] = []; // Lista de guías con título dinámico
  searchQuery: string = ''; // Búsqueda
  errorMessage: string = ''; // Para errores
  toastMessage: string | null = null;
  toastColor: string = 'success';

  constructor(
    private guideService: GuideService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarGuias();
    this.route.paramMap.subscribe((params) => {
      this.searchQuery = params.get('detalle') || '';
      this.realizarBusqueda();
    });
  }

  cargarGuias() {
    this.guideService.getAllGuides().subscribe(
      (data: Guia[]) => {
        // Procesa cada guía para agregar el atributo `frases` y un título dinámico
        this.guias = data.map((guia) => {
          return {
            ...guia,
            frases: this.procesarFrases(guia.detalle || ''),
            titulo: this.generarTitulo(guia.detalle || ''),
          };
        });
        console.log('Guías cargadas:', this.guias);
      },
      (error) => {
        console.error('Error al cargar las guías:', error);
        this.errorMessage = 'Hubo un problema al cargar las guías.';
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

  generarTitulo(detalle: string): string {
    // Usa la primera frase del detalle como título
    const primeraFrase = detalle.split(/(?<!\d)\. /)[0]?.trim();
    return primeraFrase || 'Título predeterminado'; // Si no hay frases, usa un valor predeterminado
  }

  get filteredGuides() {
    const query = this.searchQuery.toLowerCase();
    return this.guias.filter((guia) =>
      guia.detalle?.toLowerCase().includes(query)
    );
  }

  realizarBusqueda(): void {
    console.log('Realizando búsqueda para:', this.searchQuery);
  }

  verGuia(guideId?: number) {
    if (guideId) {
      this.router.navigate(['/guia', guideId]);
    } else {
      this.showToast('La guía no tiene un ID válido.', 'danger');
    }
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top',
    });
    toast.present();
  }
}
