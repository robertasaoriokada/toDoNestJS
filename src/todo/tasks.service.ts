import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskModel } from './task.model';

@Injectable()
export class TasksService {
  _tasks: TaskModel[] = [
    {id: 1, description: "Feed the cat"},
    {id: 2, description: "Wash the dishes"},
    {id: 3, description: 'Take Helena to robotic class'}
  ]

  findAllTasks(): TaskModel[]{
    return this._tasks;
  }

  findTaskById(id: number): TaskModel{
    return this._tasks.find(t => t.id == id);
  }

  createTask(t: TaskModel): TaskModel{
    let taskExists = this._tasks.filter(task => task.id == t.id);
    if(taskExists.length == 0){
      this._tasks.push(t);
      return t;
    }
    //throw new Error("Already exist a task with this id");
    
  }

  updateTask(id: number, t: TaskModel): TaskModel{
    let taskExists = this._tasks.filter(task => task.id == id);
    if(taskExists.length == 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    taskExists[0].description = t.description;
    taskExists[0].is_complete = t.is_complete;
    return taskExists[0];
  }

  deleteTask(id:number): TaskModel{
    let taskIndex = this._tasks.findIndex(task => task.id == id);
    if(taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    const deletedTask = this._tasks.splice(taskIndex, 1)[0];
    console.log('After deletion:', this._tasks);
    return deletedTask;
  }
}
