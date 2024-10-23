import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {
  editUserForm: FormGroup;
  user!: any; // Almacenar toda la información del usuario

  constructor(private formBuilder: FormBuilder, 
              private userService: AuthService) {
    
    this.editUserForm = this.formBuilder.group({
      firstName: [''],       // Nombre
      secondName: [''],      // Segundo Nombre
      firstLastName: [''],   // Primer Apellido
      secondLastName: [''],  // Segundo Apellido
      phone: [''],           // Número de Teléfono
    });
  }
  
  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const email = this.userService.getEmailFromToken();
    if (email) {
      this.userService.searchByEmail(email).subscribe(
        (user) => {
          this.user = user; // Aquí almacenas toda la información del usuario
          this.editUserForm.patchValue({
            firstName: user.firstName,
            secondName: user.secondName,
            firstLastName: user.firstLastName,
            secondLastName: user.secondLastName,
            phone: user.phone,
          });
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.editUserForm.valid) {
        const userId = this.user.id; // Asegúrate de que el ID del usuario se haya cargado correctamente
        const updatedUser = {
            ...this.editUserForm.value, // Obtiene los valores del formulario
        };

        this.userService.updateUserById(userId, updatedUser).subscribe(
            (response) => {
                console.log('Usuario actualizado con éxito:', response);
                // Redirigir o mostrar un mensaje de éxito aquí
            },
            (error) => {
                console.error('Error actualizando el usuario:', error);
                if (error.status === 401) {
                    alert('No estás autorizado para realizar esta acción. Por favor, inicia sesión nuevamente.');
                    // Opcionalmente redirigir al inicio de sesión
                } else {
                    alert('Hubo un problema al actualizar el usuario. Inténtalo de nuevo.');
                }
            }
        );
    } else {
        console.log('Formulario no válido');
        // Mostrar mensajes de validación
    }
}

}
