export interface Task {
	ID: number;
	title: string;
	description: string;
	status: "draft" | "in-progress" | "completed";
	created_at: Date;
}

export interface TaskFormData {
	title: string;
	status: "draft" | "in-progress" | "completed";
	description: string; // Make description optional
  }