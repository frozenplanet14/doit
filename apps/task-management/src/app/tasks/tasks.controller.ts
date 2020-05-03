import { Controller, Get, Body, Post, Param, Delete, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskModel } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterQuery: FilterTaskDto): TaskModel[] {
        if (Object.keys(filterQuery).length) {
            return this.tasksService.filterTasks(filterQuery);
        }
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTask(@Param('id') id: string): TaskModel {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): TaskModel {
        return this.tasksService.createTask(createTaskDto);
    }

    @Put('/:id')
    updateTask(@Param('id') id: string, @Body() req) {
        return this.tasksService.updateProperty(id, req);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): TaskModel {
        return this.tasksService.deleteTaskById(id);
    }
}
