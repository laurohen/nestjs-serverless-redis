import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {v4 as uuid} from 'uuid';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';

@Injectable()
export class TaskService {

  constructor(
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const defaultKey: string = uuid();
    await this.redis.hmset(`tasks`,`${defaultKey}`,`${JSON.stringify(createTaskDto)}`);
    return `This action add a new task id - ${defaultKey}`;
  }

  async findAll() {
    const redisData = await this.redis.hgetall('tasks');
    return redisData;
  }

  async findOne(id: string) {
    const redisData = await this.redis.hmget(`tasks`,`${id}`);
    return `This action returns a # id - ${id} task - ${redisData}`;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.redis.hmset(`${id}`, `${JSON.stringify(updateTaskDto)}`);
    return `This action updates a #${id} task`;
  }

  async remove(id: string) {
    await this.redis.del(`${id}`);
    return `This action removes a #${id} task`;
  }
}
