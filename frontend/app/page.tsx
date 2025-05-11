"use client";

import Header from "@/components/header";
import { TaskTable } from "@/components/tasks";
import { logout } from "@/lib/api";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

const queryClient = new QueryClient();

export default function Home() {
	return (
		<div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
		<Header
				title="Tasks"
				onLogout={logout}
			/>
			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<div>Loading...</div>}>
					<TaskTable />
				</Suspense>
			</QueryClientProvider>
		</div>
	);
}
