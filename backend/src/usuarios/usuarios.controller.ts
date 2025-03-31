import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Post()
    @UsePipes(new ValidationPipe()) // Validar los datos de entrada
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuariosService.create(createUsuarioDto);
    }

    @Get()
    findAll() {
        return this.usuariosService.findAll();
    }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string) {
        return this.usuariosService.findOneByEmail(email);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usuariosService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.usuariosService.update(+id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usuariosService.remove(+id);
    }
}
