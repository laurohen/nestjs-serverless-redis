import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { RedisModule } from '@svtslv/nestjs-ioredis';

@Module({
  imports: [TaskModule,
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          url: 'redis://localhost:6379',
        },
      }),
    }),

  ],
})
export class AppModule {}
