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
import React from "react";

const operators = ["eq", "ne", "lt", "gt", "like"];
const columns = ["title", "description", "status"];

type FilterInputProps = {
	filters: string[];
	setFilters: (filters: string[]) => void;
	onApply: () => void;
};

const FilterInput: React.FC<FilterInputProps> = ({
	filters,
	setFilters,
	onApply,
}) => {
	const handleOperatorChange = (index: number, operator: string) => {
		const updatedFilters = [...filters];
		const filterParts = updatedFilters[index].split(":");
		filterParts[1] = operator;
		updatedFilters[index] = filterParts.join(":");
		setFilters(updatedFilters);
	};

	const handleColumnChange = (index: number, column: string) => {
		const updatedFilters = [...filters];
		const filterParts = updatedFilters[index].split(":");
		filterParts[0] = column;
		updatedFilters[index] = filterParts.join(":");
		setFilters(updatedFilters);
	};

	const handleValueChange = (index: number, value: string) => {
		const updatedFilters = [...filters];
		const filterParts = updatedFilters[index].split(":");
		filterParts[2] = value;
		updatedFilters[index] = filterParts.join(":");
		setFilters(updatedFilters);
	};

	return (
		<div>
			{filters.length === 0 ? (
				<p className="text-sm text-muted-foreground mb-2">No filters yet</p>
			) : (
				filters.map((filter, index) => {
					const [column, operator, value] = filter.split(":");
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
									{columns.map((col) => (
										<SelectItem key={col} value={col}>
											{col}
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
					onClick={() => setFilters([...filters, "title:eq:"])}
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
			<DialogContent className="w-[500px]">
				<DialogTitle>Filter Tasks</DialogTitle>
				<FilterInput
					filters={tempFilters}
					setFilters={setTempFilters}
					onApply={applyFilters}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default FilterDialog;
