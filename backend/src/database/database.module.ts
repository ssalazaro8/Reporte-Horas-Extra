import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Asegura que las variables de entorno sean accesibles globalmente
    }),

    // Configuración de TypeORM para la conexión a SQL Server
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',  // Tipo de base de datos
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT'), 10),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false, 
        logging: true,       // Habilita los logs SQL para depuración
        options: {
          encrypt: false,  // Deshabilitar el cifrado SSL/TLS
        },
      }),
      inject: [ConfigService],  // el ConfigService es para acceder a las variables de entorno
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
