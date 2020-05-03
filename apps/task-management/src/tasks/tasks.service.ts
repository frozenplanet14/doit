import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    getTasks(filterQuery: FilterTaskDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterQuery);
    }

    // filterTasks(filterQuery: FilterTaskDto) {
    //     const {status, filter} = filterQuery;
    //     let tasks = this.tasks;

    //     if (status) {
    //         tasks = tasks.filter(t => t.status === status);
    //     }

    //     if (filter) {
    //         tasks = tasks.filter(t => t.title.includes(filter) || t.description.includes(filter));
    //     }

    //     return tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }

        return found;
    }

    // getTaskById(id: string): TaskModel {
    //     const found = this.tasks.find(t => t.id === id);

    //     if (!found) {
    //         throw new NotFoundException();
    //     }

    //     return found;
    // }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    // createTask(createTaskDto: CreateTaskDto): TaskModel {
    //     const task: TaskModel = {
    //         id: uuid.v1(),
    //         ...createTaskDto,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    async deleteTaskById(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (!result.affected) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }
    }

    // deleteTaskById(id: string) {
    //     const index = this.tasks.findIndex(t => t.id === id);
    //     let task: TaskModel = null;
    //     if (index > -1) {
    //         task = {...this.tasks[index]};
    //         this.tasks.splice(index, 1);
    //     }
    //     return task;
    // }

    async updateProperty(id: number, item: Partial<Task>): Promise<Task> {
        const task = await this.getTaskById(id);
        Object.keys(item).forEach(k => task[k] = item[k]);
        await task.save();
        return task;
    }

    // updateProperty(id: string, item: Partial<TaskModel>): TaskModel {
    //     const index = this.tasks.findIndex(t => t.id === id);
    //     if (index >= 0) {
    //         this.tasks[index] = {
    //             ...this.tasks[index],
    //             ...item
    //         }
    //         return this.tasks[index];
    //     }
    //     return null;
    // }
}
