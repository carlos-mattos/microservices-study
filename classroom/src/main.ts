import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
      },
    },
  });

  app
    .startAllMicroservices()
    .then(() => console.log('[Classroom] Microservices running !!!'));

  app
    .listen(3002)
    .then(() => console.log('[Classroom] Listening on port 3002'));
}

bootstrap();
