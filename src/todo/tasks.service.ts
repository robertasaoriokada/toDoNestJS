import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity} from './task.entity';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  _tasks: TaskEntity[] = [
    {id: uuidv4(), title:"My dear cat", description: "Feed the cat", is_complete: false},
    {id: uuidv4(), title:"Home", description: "Wash the dishes", is_complete: false},
    {id: uuidv4(), title:"Sister", description: 'Take Helena to robotic class', is_complete: false}
  ]

  findAllTasks(): TaskEntity[]{
    return this._tasks;
  }

  findTaskById(id: string): TaskEntity{
    const task = this._tasks.find(task => task.id == id);
    if(!task){
      throw new NotFoundException(`Task with id ${id} not found`)
    }
    return task;
  }

  findTaskByTitle(title: string): TaskEntity[]{
    const task = this._tasks.filter(task => task.title.toLowerCase().includes(title.toLowerCase()));
    if(task.length == 0){
      throw new NotFoundException(`Task with title ${title} not found`)
    }
    return task;
  }


  createTask(t: CreateTaskDTO): TaskEntity {
    let newTask: TaskEntity = {id: uuidv4(), title: t.title, description: t.description, is_complete: false}
    this._tasks.push(newTask);
    return newTask;
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
