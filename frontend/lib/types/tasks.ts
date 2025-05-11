export interface Task {
	ID: number;
	title: string;
	description: string;
	status: "draft" | "in-progress" | "completed";
	created_at: Date;
	due_date: Date;
}

export interface TaskFormData {
	title: string;
	status: "draft" | "in-progress" | "completed";
	description: string;
	dueDate: Date;
}
