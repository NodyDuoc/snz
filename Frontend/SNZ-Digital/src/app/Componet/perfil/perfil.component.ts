import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {
   user!: any; // Almacenar toda la información del usuario


  constructor(
    private router: Router, // Cambiado a Router aquí
    private fb: FormBuilder,
    private userService: AuthService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadUser();

  }


  loadUser() {
    const email = this.userService.getEmailFromToken();
    if (email) {
      this.userService.searchByEmail(email).subscribe(
        (user) => {
          this.user = user; // Aquí almacenas toda la información del usuario

          // Puedes hacer más acciones con el id_user si lo necesitas
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }

}
