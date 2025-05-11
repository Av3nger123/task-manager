"use client";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "./task-form";
import { useTasks } from "@/hooks/use-tasks";
import { TaskFormData } from "@/lib/types/tasks";
import { toast } from "sonner";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import FilterDialog from "./task-filter";
import { useQueryState } from "nuqs";

interface HeaderProps {
	title: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
	showCreateButton?: boolean;
}

export function Header({ title, refetch, showCreateButton = true }: HeaderProps) {

	const {createTask} = useTasks()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_,setFilters] = useQueryState("filters")

	const onCreate = ({ title, description }: TaskFormData) => {
		const promise = createTask(title,description)
		toast.promise(promise,{"loading":"Creating...","success":()=>{refetch();return "Task Created"},"error":"Failed to create task"})
	}
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center space-x-2">
				<h1 className="text-2xl font-bold">{title}</h1>
			</div>
			<div className="space-x-2">
			<Button onClick ={()=> setFilters("")} size={"icon"}><RefreshCcw/></Button>
			<FilterDialog />
			{showCreateButton && (
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							New Task
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Create Task</DialogTitle>
							<DialogDescription>
								Make changes to the tasks here. Click save when you&apos;re
								done.
							</DialogDescription>
						</DialogHeader>
						<TaskForm
							onSubmit={onCreate}
							submitLabel="Save Changes"
						/>
					</DialogContent>
				</Dialog>
			)}
			</div>
			
		</div>
	);
}
