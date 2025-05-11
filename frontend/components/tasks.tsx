"use client";

import { useState } from "react";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";
import { Trash2, Edit } from "lucide-react";
import { TaskStatusBadge } from "@/components/tasks/tasks-badge";
import { useTasks } from "@/hooks/use-tasks";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Task, TaskFormData } from "@/lib/types/tasks";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./tasks/task-header";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { TaskForm } from "./tasks/task-form";
import { Separator } from "./ui/separator";

export function TaskTable() {
	const { getTasks, deleteTask, updateTask } = useTasks();
	const [sortField, setSortField] = useState<keyof Task>("CreatedAt");
	const [sortDirection] = useState<"asc" | "desc">("desc");

	const { data: tasks, refetch } = useQuery({
		queryKey: ["tasks"],
		queryFn: () => getTasks(),
	});

	const getSortIcon = (field: keyof Task) => {
		if (sortField !== field) return null;
		return sortDirection === "asc" ? " ↑" : " ↓";
	};

  console.log("render")
	const onEdit = (id: number, data: TaskFormData) => {
		const promise = updateTask(id, data.title, data.description, data.status);
		toast.promise(promise, {
			loading: "Updating...",
			success: () => {
				refetch();
				return "Task Updated";
			},
			error: "Failed to update task",
		});
	};

	return (
		<div className="w-full overflow-auto rounded-md border">
			<div className="p-2 border-b">
				<Header title="Tasks" refetch={refetch} showCreateButton={true} />
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							className="w-[300px] cursor-pointer"
							onClick={() => setSortField("title")}
						>
							Title {getSortIcon("title")}
						</TableHead>
						<TableHead
							className="hidden md:table-cell cursor-pointer"
							onClick={() => setSortField("description")}
						>
							Description {getSortIcon("description")}
						</TableHead>
						<TableHead
							className="w-[120px] cursor-pointer"
							onClick={() => setSortField("status")}
						>
							Status {getSortIcon("status")}
						</TableHead>
						<TableHead
							className="w-[120px] hidden sm:table-cell cursor-pointer"
							onClick={() => setSortField("CreatedAt")}
						>
							Created {getSortIcon("CreatedAt")}
						</TableHead>
						<TableHead className="w-[100px] text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tasks?.data?.length === 0 ? (
						<TableRow>
							<TableCell colSpan={5} className="h-24 text-center">
								No tasks found. Create a new task to get started.
							</TableCell>
						</TableRow>
					) : (
						tasks?.data?.map((task: Task) => (
							<TableRow key={task.ID}>
								<TableCell className="font-medium">{task.title}</TableCell>
								<TableCell className="hidden md:table-cell">
									{task.description ? (
										<div className="line-clamp-1">{task.description}</div>
									) : (
										<span className="text-muted-foreground italic">
											No description
										</span>
									)}
								</TableCell>
								<TableCell>
									<TaskStatusBadge status={task.status} />
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									{format(new Date(task.CreatedAt), "MMM d, yyyy")}
								</TableCell>
								<TableCell className="text-right flex flex-row">
                <Dialog>
												<DialogTrigger asChild>
													<Button variant={"ghost"} className="w-fit">
														<Edit className="h-4 w-4" />
													</Button>
												</DialogTrigger>
												<DialogContent className="sm:max-w-[425px]">
													<DialogHeader>
														<DialogTitle>Create Task</DialogTitle>
														<DialogDescription>
															Make changes to the tasks here. Click save when
															you&apos;re done.
														</DialogDescription>
													</DialogHeader>
													<TaskForm
														onSubmit={(data: TaskFormData) =>
															onEdit(task?.ID, data)
														}
														submitLabel="Edit Changes"
                            defaultValues={{title:task.title,description:task.description,status:task.status}}
													/>
												</DialogContent>
											</Dialog>
                      <Separator orientation="vertical" className="h-full"/>
											<Button variant={"ghost"}
                        className="text-destructive w-fit"
												onClick={() => {
													deleteTask(task.ID);
													refetch();
												}}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
