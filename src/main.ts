import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { eventContext } from 'aws-serverless-express/middleware';
import { AppModule } from './app.module';

let server: Handler;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('api-serverless-task-management')
        .setDescription('Routes API REST')
        .setVersion('1.0')
        .addServer('/dev')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api', app, document, {
      customSiteTitle: 'Task Management',
      swaggerOptions: {
        docExpansion: 'none',
        operationSorter: 'alpha',
        tagSorter: 'alpha',
      },
    });
}

async function bootstrap(): Promise<Handler> {
  if(!server) {
    try {
      const app = await NestFactory.create(AppModule);
      app.use(eventContext());
      setupSwagger(app);
      await app.init();

      const expressApp = app.getHttpAdapter().getInstance();
      return serverlessExpress({ app: expressApp });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return server;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if (event.path === '/api') {
      event.path = '/api/';
  }
  event.path = event.path.includes('swagger-ui')
   ? `/api${event.path}` 
   : event.path;

  server = server ?? (await bootstrap());
  return server(event, context, callback);
};