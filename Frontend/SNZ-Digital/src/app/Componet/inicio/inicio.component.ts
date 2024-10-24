import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { Categoria } from 'src/models/categoria';
import { Producto } from 'src/models/producto';

interface CarouselImage {
  id: number;
  url: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {
  currentYear: number = new Date().getFullYear();
  searchQuery: string = '';
  cartTotal: number = 0;
  cartItemCount: number = 0;
  currentIndex: number = 0;
  transitioning = false;
  categorias: Categoria[] = [];
  productosPorCategoria: { [key: number]: Producto[] } = {}; // Almacena productos por categoría
  categoriasIds: number[] = []; // Arreglo para almacenar las IDs de las categorías

  images: CarouselImage[] = [
    {
      id: 1,
      url: 'assets/img/fondo-1.jpg',
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
    }
  ];



  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService


  ) { }

  ngOnInit(): void {
    this.loadProductos();

    // Auto-advance slides every 5 seconds
    setInterval(() => {
      this.nextSlide();
    }, 5000);
    this.cartTotal = 0;
    this.cartItemCount = 0;
  }

  
  loadProductos(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
        console.log('Categorías:', this.categorias);
        
        this.categoriasIds = [];
        this.categorias.forEach(categoria => {
          console.log('Cargando productos para la categoría:', categoria);
          this.categoriasIds.push(categoria.catId);
          
          this.productoService.getProductosByCategoria(categoria.catId).subscribe({
            next: (productos) => {
              console.log(`Productos para la categoría ${categoria.catId}:`, productos);
              this.productosPorCategoria[categoria.catId] = productos;
            },
            error: (err) => {
              console.error(`Error al cargar los productos de la categoría ${categoria.catId}:`, err);
            }
          });
        });
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    });
  }
  

   // Función para hacer scroll suave a la sección con el id proporcionado
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  search(): void {
    console.log('Buscando:', this.searchQuery);
  }

  agregarAlCarrito(producto: Producto) {
    // Lógica para agregar el producto al carrito
    console.log('Producto agregado al carrito:', producto);
}

comprarAhora(producto: Producto) {
    // Lógica para realizar la compra del producto
    console.log('Iniciar compra para el producto:', producto);
}
}
