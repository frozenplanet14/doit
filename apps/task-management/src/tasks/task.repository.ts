import { Task } from './task.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { FilterTaskDto } from './dto/filter-task.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const {title, description} = createTaskDto;
        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user
        await task.save();

        delete task.user;

        return task;
    }

    async getTasks(filterDto: FilterTaskDto, user: User): Promise<Task[]> {
        const { status, filter } = filterDto;
        const query = this.createQueryBuilder('task').andWhere('task.userId = :user', {user: user.id});

        if (status) {
            query.andWhere('task.status = :status', {status})
        }

        if (filter) {
            query.andWhere('(task.title like :filter or task.description like :filter)', {filter: `%${filter}%`})
        }

        return await query.getMany();
    }
}