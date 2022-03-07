import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiResponse({ status: HttpStatus.OK, description: 'Ok!'})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Data Undefined' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server Error' })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Ok!'})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Data Undefined' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server Error' })
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Ok!'})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Data Undefined' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server Error' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Ok!'})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Data Undefined' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server Error' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Ok!'})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Data Undefined' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server Error' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
