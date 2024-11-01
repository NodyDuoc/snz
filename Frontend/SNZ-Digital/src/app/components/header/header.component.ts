import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service'; // Asegúrate de ajustar la ruta
import { CarritoService } from 'src/app/Service/carrito.service'; // Asegúrate de ajustar la ruta

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  searchQuery: string = '';
  cartTotal: number = 0;
  cartItemCount: number = 0;
  currentIndex: number = 0;
  user: any = null;

  constructor(
    private menuController: MenuController,
    private router: Router,
    private userService: AuthService,
    private carritoService: CarritoService,

  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const email = this.userService.getEmailFromToken();
    if (email) {
      this.userService.searchByEmail(email).subscribe(
        (user) => {
          this.user = user;
          this.calculateCartItems(); // Cargar el total del carrito al cargar el usuario
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }

  calculateCartItems() {
    this.carritoService.getAllCarritos().subscribe((carritos) => {
      const userCarritos = carritos.filter(carrito => carrito.usuarioIdUser === this.user.id);

      this.cartItemCount = 0;
      this.cartTotal = 0;

      userCarritos.forEach(carrito => {
        this.carritoService.getAllDetallesCarrito().subscribe((detalles: any[]) => {
          const detallesCarrito = detalles.filter(detalle => detalle.idCarrito === carrito.idCarrito);
          detallesCarrito.forEach(detalle => {
            this.cartItemCount += detalle.cantidad; // Suma de las cantidades
            this.cartTotal += detalle.cantidad * detalle.costoUnitario; // Suma del costo total
          });
        });
      });
    });
  }

  search(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/busqueda', this.searchQuery]);
    } else {
      console.log('Ingrese un término de búsqueda');
    }
  }

  onToggleMenu(): void {
    this.menuController.open().then(() => {
      console.log('Menu opened');
    }).catch(err => {
      console.error('Error opening menu:', err);
    });
  }
}
