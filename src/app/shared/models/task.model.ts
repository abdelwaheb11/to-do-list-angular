export default class Task {
  _id!: string;
  title!: string;
  desc?: string;
  completed?: boolean;
  createdAt?: Date;
  completedAt?: Date;
}

export class TaskPagination {
  tasks!: Task[];
  totalTasks!: number;
  totalPages!: number;
  currentPage!: number;
  pageLimit!: number;
}
