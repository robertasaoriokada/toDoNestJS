import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskEntity } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
    
  @Get()
  getTasks(){
    return this.taskService.findAllTasks();
  }

  @Get(':taskId')
  getTaskById(@Param('taskId') id: string) {
    let task = this.taskService.findTaskById(id);
    if(!task){
      throw new NotFoundException(`Task with id ${id} not found`)
    }
    return task;
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
