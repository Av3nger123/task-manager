import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ListFilter, Plus, Trash } from "lucide-react";
import { Badge } from "../ui/badge";
import React from "react";
import { format } from "date-fns";

type FilterConfigItem = {
	column: string;
	label: string;
	type: "string" | "dropdown" | "date";
	operators: string[];
	options?: { value: string; label: string }[];
};

type FilterInputProps = {
	filters: string[];
	setFilters: (filters: string[]) => void;
	onApply: () => void;
	filterConfig: {
		filters: FilterConfigItem[];
	};
};

export const operatorMap: { [key: string]: string } = {
	eq: "Equals",
	ne: "Not Equal",
	lt: "Less Than",
	gt: "Greater Than",
	lte: "Less Than or Equal",
	gte: "Greater Than or Equal",
	like: "Contains",
	not_like: "Does Not Contain",
	in: "In List",
	not_in: "Not In List",
	is_null: "Is Null",
	is_not_null: "Is Not Null",
};

const FilterInput: React.FC<FilterInputProps> = ({
	filters,
	setFilters,
	onApply,
	filterConfig,
}) => {
	const handleOperatorChange = (index: number, operator: string) => {
		const updatedFilters = [...filters];
		const filterParts = updatedFilters[index].split("~");
		filterParts[1] = operator;
		updatedFilters[index] = filterParts.join("~");
		setFilters(updatedFilters);
	};

	const handleColumnChange = (index: number, column: string) => {
		const updatedFilters = [...filters];
		const filterParts = updatedFilters[index].split("~");
		filterParts[0] = column;
		updatedFilters[index] = filterParts.join("~");
		setFilters(updatedFilters);
	};

	const handleValueChange = (index: number, value: string) => {
		const updatedFilters = [...filters];
		const filterParts = updatedFilters[index].split("~");
		filterParts[2] = value;
		updatedFilters[index] = filterParts.join("~");
		setFilters(updatedFilters);
	};

	return (
		<div>
			{filters.length === 0 ? (
				<p className="text-sm text-muted-foreground mb-2">No filters yet</p>
			) : (
				filters.map((filter, index) => {
					const [column, operator, value] = filter.split("~");

					// Get filter config for the column
					const filterConfigItem = filterConfig.filters.find(
						(filterItem) => filterItem.column === column
					);

					if (!filterConfigItem) return null;

					return (
						<div key={index} className="flex items-center gap-2 mb-2">
							<Select
								value={column}
								onValueChange={(e) => handleColumnChange(index, e)}
							>
								<SelectTrigger className="w-[120px]">
									<SelectValue placeholder="Column" />
								</SelectTrigger>
								<SelectContent>
									{filterConfig.filters.map((filterItem) => (
										<SelectItem
											key={filterItem.column}
											value={filterItem.column}
										>
											{filterItem.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select
								value={operator}
								onValueChange={(e) => handleOperatorChange(index, e)}
							>
								<SelectTrigger className="w-[120px]">
									<SelectValue placeholder="Operator" />
								</SelectTrigger>
								<SelectContent>
									{filterConfigItem.operators.map((op: string) => (
										<SelectItem key={op} value={op}>
											{operatorMap[op]}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							{/* Render input based on the filter type */}
							{filterConfigItem.type === "string" && (
								<Input
									defaultValue={value}
									onBlur={(e) => handleValueChange(index, e.target.value)}
									placeholder="Value"
									className="w-[150px]"
								/>
							)}

							{filterConfigItem.type === "dropdown" && (
								<Select
									value={value}
									onValueChange={(e) => handleValueChange(index, e)}
								>
									<SelectTrigger className="w-[150px]">
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										{filterConfigItem.options?.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}

							{filterConfigItem.type === "date" && (
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={"outline"}
											className={cn(
												"justify-start text-left font-normal",
												!value && "text-muted-foreground"
											)}
										>
											<CalendarIcon />
											{value && !isNaN(Date.parse(value)) ? (
												format(new Date(value), "PPP")
											) : (
												<span>Pick a date</span>
											)}{" "}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={value ? new Date(value) : undefined} // Ensure `value` is a `Date` object
											onSelect={(date) => {
												if (date) {
													handleValueChange(index, date.toISOString());
												}
											}}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							)}

							<Button
								variant="destructive"
								size="icon"
								onClick={() => {
									const updated = filters.filter((_, i) => i !== index);
									setFilters(updated);
								}}
								className="h-8 w-8"
							>
								<Trash />
							</Button>
						</div>
					);
				})
			)}

			<div className="mt-4 flex justify-end items-center gap-2">
				<Button
					variant="outline"
					onClick={() => setFilters([...filters, "title~eq~"])}
				>
					<Plus className="mr-2 h-4 w-4" />
					Add Filter
				</Button>
				<Button onClick={onApply}>Apply Filters</Button>
			</div>
		</div>
	);
};

const FilterDialog: React.FC = () => {
	const [filters, setQueryFilters] = useQueryState("filters", {
		defaultValue: "",
	});
	const [tempFilters, setTempFilters] = React.useState<string[]>([]);

	React.useEffect(() => {
		setTempFilters(filters ? filters.split(",") : []);
	}, [filters]);

	const applyFilters = () => {
		setQueryFilters(tempFilters.join(","));
	};

	const filterConfig: { filters: FilterConfigItem[] } = {
		filters: [
			{
				column: "title",
				label: "Title",
				type: "string",
				operators: ["eq", "ne", "like"],
			},
			{
				column: "status",
				label: "Status",
				type: "dropdown",
				options: [
					{ value: "draft", label: "Draft" },
					{ value: "in-progress", label: "In Progress" },
					{ value: "completed", label: "Completed" },
				],
				operators: ["eq", "ne"],
			},
			{
				column: "created_at",
				label: "Created At",
				type: "date",
				operators: ["eq", "gt", "lt"],
			},
			{
				column: "due_date",
				label: "Due Date",
				type: "date",
				operators: ["eq", "gt", "lt"],
			},
		],
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<ListFilter />
					{filters && filters.length > 0 && (
						<Badge className="ml-2 rounded">{filters.split(",").length}</Badge>
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[1000px]">
				<DialogTitle>Filter Tasks</DialogTitle>
				<FilterInput
					filters={tempFilters}
					setFilters={setTempFilters}
					onApply={applyFilters}
					filterConfig={filterConfig}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default FilterDialog;
