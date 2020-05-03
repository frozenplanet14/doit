import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class FilterTaskDto {
    @IsOptional() @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE]) status: TaskStatus;
    @IsOptional() @IsNotEmpty() filter: string;
}