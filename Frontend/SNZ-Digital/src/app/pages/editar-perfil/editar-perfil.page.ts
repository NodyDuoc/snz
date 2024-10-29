import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthCreateUserRequest } from 'src/models/usuarioI';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  
  buscarUsuarioForm!: FormGroup;
  usuarioForm!: FormGroup;
  mostrarInformacionUsuario: boolean = false;
  usuarioActual!: AuthCreateUserRequest;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private router: Router // Inyectar Router

  ) { }

  ngOnInit() {
    // Inicializar el formulario
    this.usuarioForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: [''],
      firstLastName: ['', Validators.required],
      secondLastName: [''],
      phone: ['+', [Validators.required, Validators.pattern(/^\+?[0-9]*$/)]],
      roleListName: ['', Validators.required],
      isActivated: [''],
      changePassword: [false],
      passwordNew: ['']
    });

    // Obtener el ID del usuario desde la URL
    const encryptedId = this.route.snapshot.paramMap.get('id');
    if (encryptedId) {
      const userId = this.decryptId(encryptedId); // Desencriptar el ID
      this.buscarUsuarioPorId(+userId); // Convierte el ID a número
    }
  }


  // Función para desencriptar el ID
  decryptId(encryptedId: string): string {
    const decoded = atob(encryptedId); // Decodifica de Base64
    let decrypted = '';

    // Invierte la transformación para obtener el ID original
    for (let i = 0; i < decoded.length; i++) {
      decrypted += String.fromCharCode(decoded.charCodeAt(i) - (i % 10));
    }

    // Extrae el ID original, quitando la clave secreta
    return decrypted.replace(environment.secretKey, ''); // Devuelve solo el ID
  }


  buscarUsuarioPorId(id: number) {
    // Llamada al servicio para buscar el usuario por ID
    this.authService.getUserById(id).subscribe(
      (usuario) => {
        if (usuario && usuario.role && usuario.role.roleEnum) {
          this.usuarioActual = {
            ...usuario,
            id: usuario.id // Mapea 'id' a 'id_usuario'
          };
          
          // Asignar valores al formulario, incluyendo el rol
          this.usuarioForm.patchValue({
            firstName: usuario.firstName,
            secondName: usuario.secondName,
            firstLastName: usuario.firstLastName,
            secondLastName: usuario.secondLastName,
            email: usuario.email,
            phone: usuario.phone,
            roleListName: usuario.role.roleEnum,  // Asignar el rol correctamente
            isActivated: usuario.isActivated
          });
    
          this.mostrarInformacionUsuario = true;
        } else {
          this.mostrarAlerta('Error en la respuesta', 'No se encontró un rol válido para el usuario.');
        }
      },
      (error) => {
        this.mostrarAlerta('Error', 'No se pudo obtener el usuario.');
      }
    );
  }
  
  onPhoneInput(event: any) {
    const inputValue = event.target.value;
  
    // Verifica si el valor no comienza con '+'
    if (!inputValue.startsWith('+')) {
      event.target.value = '+' + inputValue.replace(/\D/g, ''); // Reinsertar el '+' y eliminar caracteres no numéricos
    } else {
      // Solo permite números después del '+'
      event.target.value = '+' + inputValue.slice(1).replace(/\D/g, ''); // Permitir solo dígitos
    }
  
    // Actualiza el valor en el formulario
    this.usuarioForm.patchValue({ phone: event.target.value });
  }



  async actualizarUsuario() {
    const id = this.usuarioActual?.id;

    if (this.usuarioForm.valid && id != undefined) {
      const result = await this.presentConfirmUpdate();

      if (result) {
        const loading = await this.loadingController.create({
          message: 'Actualizando...',
          spinner: 'circles',
          duration: 5000
        });
        await loading.present();

        const nuevaData: AuthCreateUserRequest = {
          firstName: this.usuarioForm.get('firstName')?.value,
          secondName: this.usuarioForm.get('secondName')?.value,
          firstLastName: this.usuarioForm.get('firstLastName')?.value,
          secondLastName: this.usuarioForm.get('secondLastName')?.value,
          email: this.usuarioForm.get('email')?.value,
          password: this.usuarioForm.get('changePassword')?.value ? this.usuarioForm.get('passwordNew')?.value : '',
          phone: this.usuarioForm.get('phone')?.value,
          isActivated: this.usuarioForm.get('isActivated')?.value,
          authCreateRoleRequest: {
            roleListName: [this.usuarioForm.get('roleListName')?.value]
          }
        };

        this.authService.updateUserById(id, nuevaData).subscribe(
          (response) => {
            loading.dismiss();
            this.mostrarAlerta('Usuario actualizado', 'Usuario actualizado correctamente');
            // Redirigir al perfil después de la actualización
            this.router.navigate(['/perfil']);
          },
          (error) => {
            loading.dismiss();
            this.mostrarAlerta('Error al actualizar', 'Ocurrió un error al actualizar, inténtelo nuevamente');
          }
        );
      }
    }
  }
  

  async eliminarUsuario() {
    const id = this.usuarioActual?.id; // Verifica que id_usuario existe

    // Comprueba si id no es undefined
    if (id !== undefined) {
      const result = await this.presentConfirmUpdate();

      if (result) {
        this.authService.deactivateUser(id).subscribe(() => {
          this.mostrarAlerta("Desactivación exitosa", "Usuario desactivado correctamente");
        });
      }
    } else {
      this.mostrarAlerta("Error", "No se pudo obtener el ID del usuario para desactivar.");
    }
  }
  async presentConfirm(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: '¿Está seguro de que desea desacticar a este usuario? ',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          }, {
            text: 'Desactivar',
            handler: () => {
              // Aquí puedes poner el código para eliminar el elemento
              resolve(true);
            }
          }
        ]
      });

      await alert.present();
    });
  }

  async presentConfirmUpdate(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: '¿Está seguro de que desea Actualizar  a este usuario? ',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          }, {
            text: 'Actualizar',
            handler: () => {
              // Aquí puedes poner el código para eliminar el elemento
              resolve(true);
            }
          }
        ]
      });

      await alert.present();
    });
  }


  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  toggleActivation() {
    const currentValue = this.usuarioForm.get('isActivated')?.value;
    this.usuarioForm.patchValue({ isActivated: !currentValue });
  }


  onViewProfile() {  
    this.router.navigate(['/perfil']);  
  }  

  onEditProfile() {  
    this.router.navigate(['/editar-perfil']);  
  }  

  onViewPurchases() {  
    this.router.navigate(['/compras']);  
  }  

  onViewAddresses() {  
    this.router.navigate(['/direcciones']);  
  }  

  onLogout() {  
    console.log('Cerrar sesión');  
    // Aquí podrías añadir lógica para cerrar sesión  
    this.router.navigate(['/login']); // Redirigir a la página de login después de cerrar sesión  
  } 


}
