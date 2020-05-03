import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';
import { Task } from '../task.entity';

export class TaskValidationPipe implements PipeTransform {
    readonly allowedStatuses: TaskStatus[] = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value: Partial<Task>) {

        if (value && value.status && !this.isValidStatus(value.status)) {
            throw new BadRequestException(`${value.status} is not a valid status`);
        }

        return value;
    }

    private isValidStatus(status: TaskStatus) {
        const idx = this.allowedStatuses.findIndex(s => s === status);
        return idx !== -1;
    }
}