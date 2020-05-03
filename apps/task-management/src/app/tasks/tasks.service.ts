import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
    private tasks: TaskModel[] = [];

    getAllTasks(): TaskModel[] {
        return this.tasks;
    }

    filterTasks(filterQuery: FilterTaskDto) {
        const {status, filter} = filterQuery;
        let tasks = this.tasks;

        if (status) {
            tasks = tasks.filter(t => t.status === status);
        }

        if (filter) {
            tasks = tasks.filter(t => t.title.includes(filter) || t.description.includes(filter));
        }

        return tasks;
    }

    getTaskById(id: string): TaskModel {
        return this.tasks.find(t => t.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): TaskModel {
        const task: TaskModel = {
            id: uuid.v1(),
            ...createTaskDto,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    deleteTaskById(id: string) {
        const index = this.tasks.findIndex(t => t.id === id);
        let task: TaskModel = null;
        if (index > -1) {
            task = {...this.tasks[index]};
            this.tasks.splice(index, 1);
        }
        return task;
    }

    updateProperty(id: string, item: Partial<TaskModel>): TaskModel {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index >= 0) {
            this.tasks[index] = {
                ...this.tasks[index],
                ...item
            }
            return this.tasks[index];
        }
        return null;
    }
}
