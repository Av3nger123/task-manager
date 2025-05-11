export interface Task {
	ID: number;
	title: string;
	description: string;
	status: "draft" | "in-progress" | "completed";
	created_at: Date;
}

export type TaskFormData = Pick<Task, "title" | "description" | "status">;