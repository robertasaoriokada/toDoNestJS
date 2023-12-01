import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskEntity } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { IsOptional } from 'class-validator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
    
  @Get()
  getTasks(){
    return this.taskService.findAllTasks();
  }

  @Get("/search")
  getTaskByIdOrTitle(@Query('taskId') id?: string, @Query('title') title?: string) {
    switch(true){
      case id !== undefined:
        const taskById = this.taskService.findTaskById(id);
        return taskById;
      case !!title:
        const taskByTitle = this.taskService.findTaskByTitle(title);
        return taskByTitle;
      default:
        return this.taskService.findAllTasks();
    }
    
  }

  @Post()
  createTask(@Body() task: CreateTaskDTO){
    this.taskService.createTask(task);
    return task;
  }

  @Put(':taskId')
  updateTask(@Param('taskId') id: string, @Body() task: UpdateTaskDTO){
    this.taskService.updateTask(id, task); // clean code?
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId') id: string){
    this.taskService.deleteTask(id);
  }
}
