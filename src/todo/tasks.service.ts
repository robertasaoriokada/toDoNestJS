import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity} from './task.entity';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  _tasks: TaskEntity[] = [
    {id: uuidv4(), title:"My dear cat", description: "Feed the cat"},
    {id: uuidv4(), title:"Home", description: "Wash the dishes"},
    {id: uuidv4(), title:"Sister", description: 'Take Helena to robotic class'}
  ]

  findAllTasks(): TaskEntity[]{
    return this._tasks;
  }

  findTaskById(id: string): TaskEntity{
    return this._tasks.find(task => task.id == id); // clean code?
  }

  createTask(t: CreateTaskDTO): TaskEntity {
    let newTask = {id: uuidv4(), title: t.title, description: t.description, is_completed: false}
    this._tasks.push(newTask);
    return newTask;
    // let taskExists = this._tasks.filter(task => task.id == t.id);
    // if(taskExists.length == 0){
    //   this._tasks.push(t);
    //   return t; // clean code?
    // }
    //throw new Error("Already exist a task with this id");
    
  }

  updateTask(id: string, task: UpdateTaskDTO): TaskEntity{
    let taskExists = this._tasks.find(task => task.id == id); // procura sobre array.find()
    if(!taskExists) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    if (task.description !== undefined) {
      taskExists.description = task.description;
    }
    if (task.is_complete !== undefined) {
      taskExists.is_complete = task.is_complete;
    }
    return taskExists;
  }

  deleteTask(id:string): TaskEntity{
    let taskIndex = this._tasks.findIndex(task => task.id == id);
    if(taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    const deletedTask = this._tasks.splice(taskIndex, 1)[0];
    console.log('After deletion:', this._tasks);
    return deletedTask;
  }
}
