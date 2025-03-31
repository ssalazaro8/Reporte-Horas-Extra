// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { RecuperacionContrasena } from './recuperacionContraseña.entity';
// import { CreateRecuperacionContrasenaDto } from './dto/create-recuperacion-contraseña.dto';
// import { v4 as uuidv4 } from 'uuid'; // Importa uuid
// import * as bcrypt from 'bcrypt'; // Importa bcrypt
// import { NotificacionesService } from '../notificaciones/notificaciones.service'; // Importa NotificacionesService
// import { UsuariosService } from '../usuarios/usuarios.service'; // Importa UsuariosService
// import { ResetPasswordDto } from './dto/reset-password.dto';

// @Injectable()
// export class RecuperacionContrasenaService {
//   constructor(
//     @InjectRepository(RecuperacionContrasena)
//     private recuperacionContrasenaRepository: Repository<RecuperacionContrasena>,
//     private readonly notificacionesService: NotificacionesService,
//     private readonly usuariosService: UsuariosService,
//   ) {}

//   async create(createRecuperacionContrasenaDto: CreateRecuperacionContrasenaDto): Promise<RecuperacionContrasena> {
//     const recuperacionContrasena = this.recuperacionContrasenaRepository.create(createRecuperacionContrasenaDto);
//     return await this.recuperacionContrasenaRepository.save(recuperacionContrasena);
//   }

//   async generateToken(usuarioId: number): Promise<string> {
//     const token = uuidv4();
//     const fechaExpiracion = new Date();
//     fechaExpiracion.setHours(fechaExpiracion.getHours() + 24); // El token expira en 24 horas

//     const createRecuperacionContrasenaDto: CreateRecuperacionContrasenaDto = {
//       ID_Usuario: usuarioId,
//       Token: token,
//     };

//     await this.create(createRecuperacionContrasenaDto);

//     return token;
//   }

//   async requestPasswordReset(email: string): Promise<void> {
//     const usuario = await this.usuariosService.findByEmail(email);
//     if (!usuario) {
//       throw new NotFoundException('No se encontró ningún usuario con ese correo electrónico.');
//     }

//     const token = await this.generateToken(usuario.ID_Usuario);

//     // Envía el correo electrónico con el token
//     await this.notificacionesService.sendNotification(
//       {
//         ID_Usuario: usuario.ID_Usuario,
//         Asunto: 'Recuperación de contraseña',
//         Mensaje: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://tu_aplicacion/reset-password?token=${token}`,
//       },
//       usuario.Email
//     );
//   }

//   async resetPassword(token: string, resetPasswordDto: ResetPasswordDto): Promise<void> {
//     const recuperacionContrasena = await this.recuperacionContrasenaRepository.findOne({ where: { Token: token } });

//     if (!recuperacionContrasena) {
//       throw new NotFoundException('Token de recuperación de contraseña inválido.');
//     }

//     if (recuperacionContrasena.FechaExpiracion < new Date()) {
//       throw new BadRequestException('El token de recuperación de contraseña ha expirado.');
//     }

//     const usuario = await this.usuariosService.findOne(recuperacionContrasena.ID_Usuario);
//     if (!usuario) {
//       throw new NotFoundException('Usuario no encontrado.');
//     }

//     // Hash de la nueva contraseña
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(resetPasswordDto.password, salt);

//     // Actualiza la contraseña del usuario
//     usuario.Contrasena = hashedPassword;
//     await this.usuariosService.update(usuario.ID_Usuario, usuario);

//     // Elimina el token de recuperación de contraseña
//     await this.recuperacionContrasenaRepository.delete(recuperacionContrasena.ID_Recuperacion);
//   }
// }
