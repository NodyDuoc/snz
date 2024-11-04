import { Component, OnInit } from '@angular/core';
interface CarouselImage {
  id: number;
  url: string;
  title: string;
  description: string;
}
@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss'],
})
export class CarruselComponent  implements OnInit {
  transitioning = false;
  cartTotal: number = 0;
  cartItemCount: number = 0;
  currentIndex: number = 0;

  images: CarouselImage[] = [
    {
      id: 1,
      url: 'assets/img/fondo-6.jpg',
      title: '',
      description: ''
    },
    {
      id: 2,
      url: 'assets/img/fondo-4.jpg',
      title: 'Explora el Futuro del Gaming con Estilo',
      description: 'Potencia tu experiencia gamer con los PCs más avanzados y personalizables del mercado. Desde diseños futuristas hasta temas inspirados en tus personajes favoritos, estas torres están listas para ofrecerte rendimiento y estilo en cada partida. Elige tu configuración y lleva tu setup al siguiente nivel.'
    },
    {
      id: 3,
      url: 'assets/img/fondo-3.jpg',
      title: 'Setup Gamer de Alto Rendimiento',
      description: 'Transforma tu espacio con un setup diseñado para ofrecer la mejor experiencia en gaming. Equipado con tecnología de punta y un diseño elegante, este equipo Corsair te permite disfrutar de tus juegos con máxima fluidez y estilo. Domina cada partida con un entorno optimizado para rendimiento y comodidad.'
    },
  ];

  constructor() { }

  ngOnInit(): void {
    // Auto-advance slides every 5 seconds
    setInterval(() => {
      this.nextSlide();
    }, 8000);
    this.cartTotal = 0;
    this.cartItemCount = 0;
  }

  nextSlide(): void {
    if (this.transitioning) return;
    this.transitioning = true;

    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    setTimeout(() => (this.transitioning = false), 0); // Duración de la transición
  }

  prevSlide(): void {
    if (this.transitioning) return;
    this.transitioning = true;

    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    setTimeout(() => (this.transitioning = false), 0); // Duración de la transición
  }

  setCurrentSlide(index: number): void {
    this.currentIndex = index;
  }

}
