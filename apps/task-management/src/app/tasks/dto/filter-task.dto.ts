import { TaskStatus } from '../task.model';

export class FilterTaskDto {
    status: TaskStatus;
    filter: string;
}