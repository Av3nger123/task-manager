"use client";

import { TaskTable } from "@/components/tasks";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
	return (
		<div className="min-h-screen pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<QueryClientProvider client={queryClient}>
				<TaskTable />
			</QueryClientProvider>
		</div>
	);
}
