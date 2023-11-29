import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskModel } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
    
  @Get()
  getTasks(){
    return this.taskService.findAllTasks();
  }

  @Get(':taskId')
  getTaskById(@Param('taskId') id: number) {
    let task = this.taskService.findTaskById(id);
    if(!task){
      throw new NotFoundException(`Task with id ${id} not found`)
    }
    return task;
  }

  @Post()
  createTask(@Body() t: TaskModel){
    this.taskService.createTask(t);
    return t;
  }

  @Put(':taskId')
  updateTask(@Param('taskId') id: number, @Body() t: TaskModel){
    this.taskService.updateTask(id, t);
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId') id: number){
    this.taskService.deleteTask(id);
  }
}
