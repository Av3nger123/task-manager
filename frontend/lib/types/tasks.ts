export interface Task {
    ID: number;
    title: string;
    description: string;
    status: 'draft' | 'in-progress' | 'completed';
    CreatedAt: Date;
  }
  
  export type TaskFormData = Pick<Task, 'title' | 'description' | 'status'>;
  