import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {
  productos = [
    {
      imagen: 'assets/img/producto_destacado_1.jpg',
      titulo: 'Producto Destacado 1',
      precio: '$100'
    },
    {
      imagen: 'assets/img/producto_destacado_2.jpg',
      titulo: 'Producto Destacado 2',
      precio: '$150'
    },
    {
      imagen: 'assets/img/producto_destacado_3.jpg',
      titulo: 'Producto Destacado 3',
      precio: '$200'
    }
  ];

  constructor() { }

  ngOnInit() {}

   // Función para hacer scroll suave a la sección con el id proporcionado
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
