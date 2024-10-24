import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthCreateUserRequest } from 'src/models/usuarioI';
import { AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {
  buscarUsuarioForm!: FormGroup;
  usuarioForm!: FormGroup;
  mostrarInformacionUsuario: boolean = false;
  usuarioActual!: AuthCreateUserRequest;
  user!: any; // Almacenar toda la información del usuario
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private loadingController: LoadingController

  ) { }


  
  ngOnInit() {
    this.loadUser();
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
    })
    ;

    // Obtener el ID del usuario desde la URL
    const userId = this.route.snapshot.paramMap.get('id');
    this.loadUser();
    
  }

  loadUser() {
    const email = this.authService.getEmailFromToken();
    if (email) {
      this.authService.searchByEmail(email).subscribe(
        (user) => {
          this.user = user; // Aquí almacenas toda la información del usuario

          // Cargar el usuario por ID
          const userId = user.id; // Asegúrate de que 'id' sea el nombre correcto de tu parámetro de ruta
          this.authService.getUserById(userId).subscribe(user => {
            this.user = user; // Asigna los datos del usuario a la propiedad

            // Aquí actualizas todos los campos del formulario, incluyendo roles, activación, y demás
            this.usuarioForm.patchValue({
              firstName: user.firstName,
              secondName: user.secondName,
              firstLastName: user.firstLastName,
              secondLastName: user.secondLastName,
              phone: user.phone,
              roleListName: user.role?.roleEnum, // Ajustar según cómo guardes los roles
              isActivated: user.isActivated, // Suponiendo que esta propiedad está en tu objeto user
              email: user.email,
              changePassword: false, // Por defecto, no cambiar la contraseña
              passwordNew: 'Hola', // Campo vacío hasta que decida cambiar la contraseña
            });
          });
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }
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
          message: 'Actualizando...', // Mensaje de carga
          spinner: 'circles', // Tipo de spinner
          duration: 5000 // Tiempo máximo antes de ocultar el loading, opcional
        });
        await loading.present();
  
        const nuevaData = {
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
            loading.dismiss(); // Ocultar la pantalla de carga
            this.mostrarAlerta('Usuario actualizado', 'Usuario actualziado correctamente');
            // Manejar la respuesta, como redirigir o mostrar un mensaje
          },
          (error) => {
            loading.dismiss(); // Ocultar la pantalla de carga en caso de error
            this.mostrarAlerta('Error al actualizar', "Ocurrio un error al actualizar intentelo nuevamente");
            // Manejar el error, como mostrar un mensaje de error
          }
        );
  
        
      }
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


}
