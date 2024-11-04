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
  usuarioForm!: FormGroup;
  usuarioActual!: AuthCreateUserRequest;
  mostrarInformacionUsuario: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private router: Router // Inyectar Router
  ) {}

  ngOnInit() {
    this.inicializarFormulario();
    this.cargarUsuarioDesdeRuta();
  }

  inicializarFormulario() {
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
  }

  cargarUsuarioDesdeRuta() {
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

    return decrypted.replace(environment.secretKey, ''); // Devuelve solo el ID
  }

  buscarUsuarioPorId(id: number) {
    this.authService.getUserById(id).subscribe(
      (usuario) => {
        if (usuario && usuario.role && usuario.role.roleEnum) {
          this.usuarioActual = { ...usuario, id: usuario.id };
          this.usuarioForm.patchValue({
            firstName: usuario.firstName,
            secondName: usuario.secondName,
            firstLastName: usuario.firstLastName,
            secondLastName: usuario.secondLastName,
            email: usuario.email,
            phone: usuario.phone,
            roleListName: usuario.role.roleEnum,
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
    if (!inputValue.startsWith('+')) {
      event.target.value = '+' + inputValue.replace(/\D/g, '');
    } else {
      event.target.value = '+' + inputValue.slice(1).replace(/\D/g, '');
    }
    this.usuarioForm.patchValue({ phone: event.target.value });
  }

  async actualizarUsuario() {
    const id = this.usuarioActual?.id;
    if (this.usuarioForm.valid && id !== undefined) {
      const result = await this.presentConfirmUpdate();
      if (result) {
        const loading = await this.loadingController.create({
          message: 'Actualizando...',
          spinner: 'circles',
          duration: 5000
        });
        await loading.present();

        const nuevaData: AuthCreateUserRequest = {
          ...this.usuarioForm.value,
          password: this.usuarioForm.get('changePassword')?.value ? this.usuarioForm.get('passwordNew')?.value : '',
          authCreateRoleRequest: {
            roleListName: [this.usuarioForm.get('roleListName')?.value]
          }
        };

        this.authService.updateUserById(id, nuevaData).subscribe(
          (response) => {
            loading.dismiss();
            this.mostrarAlerta('Usuario actualizado', 'Usuario actualizado correctamente');
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

  async presentConfirmUpdate(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: '¿Está seguro de que desea actualizar a este usuario?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => resolve(false)
          },
          {
            text: 'Actualizar',
            handler: () => resolve(true)
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
