"use client";

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
import { ListFilter, Plus, Trash } from "lucide-react";
import { Badge } from "../ui/badge";

const operators = ["eq", "ne", "lt", "gt", "like"]; // You can extend this as needed
const columns = ["title", "description", "status"];
const FilterInput: React.FC = () => {
	const [filters, setFilters] = useQueryState("filters", { defaultValue: "" });
	const filterArray = filters ? filters.split(",") : [];

	const handleOperatorChange = (index: number, operator: string) => {
		const updatedFilters = [...filterArray];
		const filterParts = updatedFilters[index].split(":");
		filterParts[1] = operator;
		updatedFilters[index] = filterParts.join(":");
		setFilters(updatedFilters.join(","));
	};

	const handleColumnChange = (index: number, column: string) => {
		const updatedFilters = [...filterArray];
		const filterParts = updatedFilters[index].split(":");
		filterParts[0] = column;
		updatedFilters[index] = filterParts.join(":");
		setFilters(updatedFilters.join(","));
	};

	const handleValueChange = (index: number, value: string) => {
		const updatedFilters = [...filterArray];
		const filterParts = updatedFilters[index].split(":");
		filterParts[2] = value;
		updatedFilters[index] = filterParts.join(":");
		setFilters(updatedFilters.join(","));
	};

	return (
		<div>
			{filterArray.map((filter, index) => {
				const [column, operator, value] = filter.split(":");
				return (
					<div key={index} className="flex items-center gap-2 mb-2">
						<Select
							value={column}
							onValueChange={(e) => handleColumnChange(index, e)}
						>
							<SelectTrigger className="w-[120px]">
								<SelectValue placeholder="Operator" />
							</SelectTrigger>
							<SelectContent>
								{columns.map((column) => (
									<SelectItem key={column} value={column}>
										{column}
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
								{operators.map((op) => (
									<SelectItem key={op} value={op}>
										{op}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Input
							defaultValue={value}
							onBlur={(e) => handleValueChange(index, e.target.value)}
							placeholder="Value"
							className="w-[150px]"
						/>
						<Button
							variant="destructive"
							size="icon"
							onClick={() => {
								const updatedFilters = filterArray.filter(
									(_, i) => i !== index
								);
								setFilters(updatedFilters.join(","));
							}}
							className="h-8 w-8"
						>
							<Trash />
						</Button>
					</div>
				);
			})}
			<Button
				variant="outline"
				size="icon"
				onClick={() => {
					const updatedFilters = [...filterArray, "title:eq:"];
					setFilters(updatedFilters.join(","));
				}}
				className="mt-2"
			>
				<Plus />
			</Button>
		</div>
	);
};

const FilterDialog: React.FC = () => {
	const [filters] = useQueryState("filters", { defaultValue: "" });
	const filterArray = filters ? filters.split(",") : [];

	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="outline">
					<ListFilter />{filterArray?.length > 0 &&  <Badge>{filterArray?.length ?? 0}</Badge>}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[500px]">
				<DialogTitle>Filter Tasks</DialogTitle>
				<FilterInput />
			</DialogContent>
		</Dialog>
	);
};

export default FilterDialog;
