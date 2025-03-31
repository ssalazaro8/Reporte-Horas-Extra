// import { Controller, Post, Body, Param, Get, BadRequestException } from '@nestjs/common';
// import { RecuperacionContrasenaService } from './recuperacionContraseña.service';
// import { ResetPasswordDto } from './dto/reset-password.dto';

// @Controller('recuperacion-contrasena')
// export class RecuperacionContrasenaController {
//   constructor(private readonly recuperacionContrasenaService: RecuperacionContrasenaService) {}

//   @Post('request')
//   async requestPasswordReset(@Body('email') email: string): Promise<void> {
//     return await this.recuperacionContrasenaService.requestPasswordReset(email);
//   }

//   @Post('reset/:token')
//   async resetPassword(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
//     return await this.recuperacionContrasenaService.resetPassword(token, resetPasswordDto);
//   }
// }
